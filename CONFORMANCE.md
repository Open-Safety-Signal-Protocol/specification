# Conformance

## Level A

- CloudEvents 1.0 structured JSON over HTTP.
- `datacontenttype` MUST be `application/json`.
- `dataschema` MUST point to the correct per-type JSON Schema.
- Payload MUST validate against the referenced schema.

## Level B

- All Level A requirements.
- OTLP mapping implemented (HTTP `/v1/logs`), preserving fields listed in `MAPPINGS.md`.
- W3C Trace Context propagated when present.

Vendors MUST document their conformance level and list any extensions.
