---
id: nimbus-devtools-guide
title: Nimbus Developer Tools Guide
slug: /nimbus-devtools-guide
---

# Nimbus Developer Tools Guide

This guide provides an overview of the Nimbus Developer Tools, designed for Nimbus experiment debugging. With these tools, you can more easily test experiments, debug targeting expressions, and browse through available experiments.

### Installation

To install the Nimbus Developer Tools, download the latest release from the [Nimbus DevTools GitHub repository](https://github.com/mozilla-extensions/nimbus-devtools/releases).

## Core Features

### 1. Experiment Enrollment via JSON Recipe

The **Experiment Enrollment** feature allows you to manually enroll in an experiment by pasting its JSON recipe.

- **How to Use**:
  1. Load `about:studies` and ensure that your profile is not enrolled in any conflicting experiments.
  2. On the **Experimenter** page for your experiment, copy the contents of the `Recipe JSON` field from the `Summary` tab.
  3. Navigate to the Nimbus Developer Tools **JSON Enrollment** page.
  4. Paste the copied JSON into the provided textarea.
  5. Click **Enroll**.
  6. Reload `about:studies` to see the experiment.

### 2. Experiment Enrollment via Feature Configuration

The **Feature Configuration Enrollment** feature allows you to enroll in specific feature configurations for experiments.

- **How to Use**:
  1. Load `about:studies` and ensure that your profile is not enrolled in any conflicting experiments.
  2. Navigate to the Nimbus Developer Tools **Feature Configuration** page.
  3. Select a **Feature ID** from the dropdown.
  4. Set the `isRollout` option to `true` or `false` as required.
  5. Paste the feature configuration JSON into the textarea.
  6. Click **Enroll**.
  7. Reload `about:studies` to see the experiment.

### 3. JEXL Debugger

The **JEXL Debugger** allows you to test JavaScript Expression Language (JEXL) expressions, which are used to define targeting conditions for experiments. You can test expressions with different client context values to ensure they behave as expected.

- **How to Use**:
  1. Navigate to the **JEXL Debugger** page in Nimbus Developer Tools.
  2. Enter your JEXL expression in the provided text area.
  3. Click **Evaluate** to test the expression and view the results in the **Output** section.
  
- **Editing Client Context**:
  1. Modify the client context values to simulate different user conditions.
  2. Click **Evaluate** again to see how the expression responds to the modified context.
  3. Use the **Refresh** button to reset the client context to its original state.

### 4. Experiment Store

The **Experiment Store** lets you browse all experiments stored in `about:studies`, giving you information about each experiment’s description, feature IDs, and status. You can also use the browser to unenroll from experiments or delete inactive ones.

- **How to Use**:
  1. Navigate to the **Experiment Store** page in Nimbus Developer Tools.
  2. Browse through available experiments.
  3. To manage enrollments:
     - Click **Unenroll** to remove yourself from an active experiment.
     - Click **Delete** to remove inactive experiments from the store.

### 5. Experiment Browser

The **Experiment Browser** serves as a hub for browsing through experiments from different environments and with different statuses. You can view information about experiments and take actions like enrolling or generating test IDs for specific branches.

Key features include:
- **Environment Switching**: Choose between **Production** and **Stage** environments to view experiments specific to each environment.
- **Status Filtering**: Filter experiments by **Live** or **Preview** status to focus on active or upcoming experiments.
- **Experiment Details**: For each experiment, view key information such as the **name**, **description**, **channel**, **version**, and **enrollment status**.
- **Branch Selection**: Select a specific branch from a dropdown menu to either **force enroll** in an experiment or **generate a test ID**.
- **Refresh**: Use the **Refresh** button to update the experiment list in real-time, ensuring you're working with the most current data.


### 6. Choosing Experiment Collection

The **Choose Experiment Collection** option allows you to select which Nimbus Remote Settings collection to use for experiments. This feature enables you to toggle between live and preview collections or specify a custom collection for advanced testing.

You can choose from three options:
1. **Live (nimbus-desktop-experiments)**: Syncs with the collection used for live experiments.
2. **Preview (nimbus-preview)**: Syncs with the preview collection for testing experiments.
3. **Custom**: Allows you to specify a custom collection for specialized testing needs.

- **How to Use**:
  1. Navigate to the **Settings** page in Nimbus Developer Tools.
  2. Under **Choose Experiment Collection**, select **Live**, **Preview**, or **Custom** depending on your testing needs.
  3. If you choose **Custom**, enter the collection name to load your specified records.

### 7. Manual Experiment Reloading

The **Manual Experiment Reload** option allows you to manually trigger updates for experiments, giving you control over whether or not you sync with the Remote Settings collection.

You can choose from two scenarios:
1. **Update Local Remote Settings Collection**: This will sync your local copy with the latest data from Remote Settings.
2. **Re-evaluate Experiments Without Syncing**: This will refresh the experiment targeting and conditions without syncing the Remote Settings collection.

- **How to Use**:
  1. Navigate to the **Settings** page in Nimbus Developer Tools.
  2. Choose **Update with Remote Settings Sync** to fetch the latest data from Remote Settings.
  3. Alternatively, select **Update without Remote Settings Sync** to refresh only the experiment targeting and conditions.

This gives you the flexibility to either update the Remote Settings data or just re-evaluate experiments without syncing.
