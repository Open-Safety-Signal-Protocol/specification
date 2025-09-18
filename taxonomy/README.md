# OSSP Core Event Taxonomy (v1.0)

OSSP event types use dot-separated notation: `ai.<domain>.<action>`.

## Safety

- `ai.safety.guardrail.interaction` -- when a safety mechanism blocks, modifies, or flags an input or output.
- `ai.safety.policy.violation` -- when a policy is violated or an enforcement is overruled.

## Performance

- `ai.performance.drift.detected` -- when a drift metric crosses a threshold (concept, feature, or prediction).

## Governance

- `ai.governance.lifecycle.change` -- for deployments, rollbacks, or configuration changes.

## Security

- `ai.security.abuse.attempt` -- when a prompt-injection, jailbreak, malware-generation, or similar attempt is detected.

## Data

- `ai.dataset.access` -- for access to training or inference datasets to aid auditability.

## Experimentation

- `ai.experiment.run` -- markers for A/B tests or evaluation runs.

See per-type schemas under `schema/v1.0.0/`.
