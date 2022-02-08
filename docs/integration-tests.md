---
id: integration-tests
title: Integration Test Docs
slug: /integration-tests
---

# Integraiton Tests

## About

The integration test suite is an end-to-end test suite that uses Selenium and Firefox to verify nimbus functions properly for users.

## Nimbus Tests
### Getting Started

1. Create a python virtual environment
2. Copy `.env.intergation-tests` file to `.env`.
3. Run the `make up_prod_detached` command.
4. Run the following command to run the integration tests: `make integration_test_nimbus PYTEST_ARGS="$PYTEST_ARGS"`

## Legacy tests

To run the legacy steps follow steps 1-3 above. Then run this command: `make integration_test_legacy`. This will run the legacy experimenter testt suite.

#### Running a single test

If you would like to run just 1 test, pass this flag to PYTEST_ARGS with the test name you would like to run: `'-k`. Example `make integration_test_nimbus PYTEST_ARGS=-ktest_archive_experiment`
