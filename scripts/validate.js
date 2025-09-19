const fs = require('fs');
const path = require('path');
const Ajv2020 = require('ajv/dist/2020');
const addFormats = require('ajv-formats');

const repoRoot = path.resolve(__dirname, '..');

const metaFiles = [
  'schema/meta/2020-12/meta/applicator.json',
  'schema/meta/2020-12/meta/content.json',
  'schema/meta/2020-12/meta/core.json',
  'schema/meta/2020-12/meta/format-annotation.json',
  'schema/meta/2020-12/meta/meta-data.json',
  'schema/meta/2020-12/meta/unevaluated.json',
  'schema/meta/2020-12/meta/validation.json',
  'schema/meta/2020-12/schema.json'
].map((rel) => path.join(repoRoot, rel));

const cases = [
  {
    schema: 'schema/v1.0.0/ai.safety.guardrail.interaction.schema.json',
    data: 'examples/test-events/guardrail.data.json'
  },
  {
    schema: 'schema/v1.0.0/ai.performance.drift.detected.schema.json',
    data: 'examples/test-events/drift.data.json'
  },
  {
    schema: 'schema/v1.0.0/ai.governance.lifecycle.change.schema.json',
    data: 'examples/test-events/governance.data.json'
  },
  { schema: 'schema/v1.0.0/ai.dataset.access.schema.json',
    data: 'examples/test-events/dataset_access.data.json' },
  { schema: 'schema/v1.0.0/ai.experiment.run.schema.json',
    data: 'examples/test-events/experiment_run.data.json' },
  { schema: 'schema/v1.0.0/ai.safety.policy.violation.schema.json',
    data: 'examples/test-events/policy_violation.data.json' },
  { schema: 'schema/v1.0.0/ai.security.abuse.attempt.schema.json',
    data: 'examples/test-events/abuse_attempt.data.json' }
].map(({ schema, data }) => ({
  schema: path.join(repoRoot, schema),
  data: path.join(repoRoot, data)
}));

const ajv = new Ajv2020({
  strict: false,
  allErrors: true,
  meta: false
});
addFormats(ajv);

for (const metaPath of metaFiles) {
  const metaSchema = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
  ajv.addMetaSchema(metaSchema, undefined, false);
}

let failed = false;
for (const { schema, data } of cases) {
  const schemaJson = JSON.parse(fs.readFileSync(schema, 'utf-8'));
  const dataJson = JSON.parse(fs.readFileSync(data, 'utf-8'));
  const validate = ajv.compile(schemaJson);
  const valid = validate(dataJson);
  if (!valid) {
    failed = true;
    console.error(`Validation failed for ${path.relative(repoRoot, data)}:`);
    for (const err of validate.errors || []) {
      console.error(`  [${err.instancePath || '/'}] ${err.message}`);
    }
  } else {
    console.log(`Validated ${path.relative(repoRoot, data)} against ${path.relative(repoRoot, schema)}`);
  }
}

if (failed) {
  process.exit(1);
}
