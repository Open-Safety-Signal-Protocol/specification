# Integration Guide

This guide shows how to integrate the Open Safety Signal Protocol (OSSP) into your AI systems.

## 1. Model Instrumentation

1. Identify the AI assets (models, guardrails, datasets) that need safety telemetry.
2. Implement emitters inside your application services. Each emitter should construct a CloudEvent payload that references an OSSP schema in `schema/v1.0.0/`.
3. Ensure every event includes the `resource` object with `model_id` and `environment`.

## 2. Event Delivery

- Send events as CloudEvents 1.0 structured JSON (`Content-Type: application/cloudevents+json; charset=utf-8`).
- Recommended transport patterns:
  - HTTPS POST to the OSSP collector endpoint.
  - OTLP/HTTP `/v1/logs` via an OpenTelemetry Collector using the mappings in `MAPPINGS.md`.

## 3. Validation

- Add CI validation similar to `.github/workflows/validate.yml` to keep example events and documentation aligned with the canonical schemas.
- Optionally perform runtime validation using the SDKs (see `sdk-python`).

## 4. Governance & Compliance

- Track conformance level (Level A or B) for each emitting system.
- Maintain governance artifacts (OEPs, policies) in the `community` repository.
- Plan for foundation transfer per the [Neutrality Pledge](../community/GOVERNANCE.md).

## 5. Next Steps

- Extend the taxonomy with additional domain-specific types under `schema/v1.0.0/`.
- Publish per-type mapping guides for other transports (Kafka, Pub/Sub) as needed.
- Engage with the OSSP Working Group via the `community` repository.
