---
id: integration-tests
title: Integration Tests
slug: /technical-reference/integration-tests
---

# Integration Tests

## About

The integration test suite is an end-to-end test suite that uses Selenium and Firefox to verify Nimbus functions properly for users.

## Nimbus Tests
### Getting Started

You must have Docker installed.

1. Create a python virtual environment
2. Copy `.env.integration-tests` file to `.env`.
3. Run `make refresh SKIP_DUMMY=1` to initialize the DB and setup Nimbus.
4. Run the `make up_prod_detached` command.
5. Run the following command to run the integration tests: `make integration_test_nimbus`

To pass custom parameters to pytest use the environment variable `PYTEST_ARGS`.

## Legacy tests

To run the legacy tests follow steps 1-3 above. Then run this command: `make integration_test_legacy`. This will run the legacy experimenter test suite.

## Running a single test

If you would like to run just 1 test, pass this flag to PYTEST_ARGS with the test name you would like to run: `-k`. Example `make integration_test_nimbus PYTEST_ARGS=-ktest_archive_experiment`
