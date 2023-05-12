# Local configuration for natural enrollments

## Desktop
Preferences to set in Firefox
- `nimbus.debug`: `True`
- `app.normandy.run_interval_seconds`: 30
- `services.settings.server`: `http://localhost:8888/v1`

Note: You can also use the [remote-settings-devtools](https://github.com/mozilla-extensions/remote-settings-devtools) add-on to control some of these but the `app.normandy.run_interval_seconds` preference must still be set.

## Instructions for Nimbus
1. Set the above preferences within Firefox
2. Create a desktop experiment with the following settings
    - A desktop feature
    - No advanced targeting
    - All Locales
    - All Regions
    - `Percent of clients`: 100%
    - `Expected Number of Clients`: 1 (or any number above 0)
3. Request Launch and Approve the experiment in Remote Settings
4. Open the Browser Console to view the logs from “RSLoader” (`RemoteSettingsExperimentLoader.Jsm`)

There should be log outputs of the RSLoader reading from remote settings and showing the JEXL evaluations being attempted. Eventually the experiment you created should be loaded and evaluated. If you are enrolled into a study with the same feature, the new experiment will not be allowed to enroll.
 5. Check `about:telemetry` for an event that looks like this
- Enrollment
    ```
    normandy  enroll    nimbus_experiment <name-of-experiment>
- Unenrollment
    ```
    normandy  unenroll  nimbus_experiment <name-of-experiment>
    ```
## Mobile

Coming soon!
