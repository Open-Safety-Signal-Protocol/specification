# Open Safety Signal Protocol (OSSP) Specification -- v1.0.0

**Status:** Stable

The key words **MUST**, **MUST NOT**, **SHOULD**, and **MAY** are to be interpreted as described in RFC 2119 and RFC 8174.

## 1. Overview

OSSP defines a vendor-neutral way to emit AI safety, governance, and risk signals. OSSP events MUST be encoded as CloudEvents 1.0 using structured JSON over HTTP. Event-type payloads MUST conform to the corresponding JSON Schemas in `schema/v1.0.0/`.

- **CloudEvents envelope fields:** `specversion`, `id`, `source`, `type`, `time`, `datacontenttype`, and `dataschema` (REQUIRED); `subject` (RECOMMENDED); extension fields such as `correlationid` (OPTIONAL).
- **OSSP data object:** MUST include a `resource` object describing the AI asset.

## 2. Data Object

The `data` member of the CloudEvent MUST contain the following.

### 2.1 `resource` (REQUIRED)

| Field           | Type   | Notes                                      |
| --------------- | ------ | ------------------------------------------ |
| `model_id`      | string | Example: `gpt-4o` or an internal identifier|
| `environment`   | string | `development` \| `staging` \| `production` |
| `model_version` | string | Optional version or artifact identifier    |

### 2.2 Event-type fields

Each event type adds fields defined in its per-type schema (see `schema/v1.0.0`). Example event types:

- `ai.safety.guardrail.interaction`
- `ai.performance.drift.detected`
- `ai.governance.lifecycle.change`
- `ai.security.abuse.attempt`
- `ai.dataset.access`
- `ai.experiment.run`

## 3. Transport

- **HTTP ingress:** CloudEvents structured JSON (`Content-Type: application/cloudevents+json; charset=utf-8`).
- **OTLP export:** Conformance-B implementations MUST map to OTLP/HTTP `/v1/logs`. See `MAPPINGS.md`.

## 4. Security & Privacy

- `data.input_hash` SHOULD be computed using HMAC-SHA256 with a tenant-scoped rotating key; truncation to the first 16 bytes is RECOMMENDED for exposure.
- Implementations MUST NOT include raw personal data in telemetry without explicit policy.
- If W3C Trace Context is present, implementations SHOULD propagate `traceparent` and `tracestate`.

## 5. Conformance

See `CONFORMANCE.md` for detailed requirements. In summary:

- **Level A:** CloudEvents 1.0 + per-type schema validation.
- **Level B:** Level A + normative OTLP mapping.

## 6. Governance

OSSP will be transferred to a neutral foundation within 12-18 months of v1.0 along with a public working group. See `../community/GOVERNANCE.md`.
