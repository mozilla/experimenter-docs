---
id: monitoring
title: Monitoring Your Experiment
sidebar_label: Monitoring
slug: /monitoring
---

Once your experiment has launched, from your experimenter page you will now have a "Live Monitoring Dashboard" link in the gray sidebar (on the left of the page).  

When to check here:
1. 15 mins to 2 hours after launch, check that your experiment is enrolling users.  If you have no users or gaining users much slower or quicker than you'd expect based on your expected number of clients - share the link and your concern in #ask-experimenter.
2. Anytime during your experiment you can check that you don't have unexpected enrollment changes.
3. Before you Close Enrollment, **check that you have enrolled the expected number of clients**.  You do this by comparing your "expected enrolled clients" to the **Cummulative Population Estitate** number before ending enrollment.  If it is significantly different - ask in ask-experimenter and tag the assigned data scientist if it is OK to end.

What the different charts mean:
1. **Cummulative Population Estimate** is the total number of people enrolled in your experiment.  This is the chart experiment owners most frequently check to see if enrollment is on track for the expected number of clients.  Experiments are sized for this cummulative enrollment number, not daily active numbers.  
2. **Cumulative Population Estimate by Branch** is only used to troubleshoot if enrollment is unhealthy.  Example, if the branches are not enrolling evenly (the lines are far apart) it is a sign something could be wrong.  
3. **Daily Active Population** is just a point of data to know how many of your enrolled users are active every day.
4. **Daily Enrollments** and other Enrollment charts provide data around new enrollments.  This is used for troubleshooting or evaluating how much longer enrollment may be needed (if we are seeing low enrollment numbers).
5. **Enrollments Overall** is similar to Enrollments Daily - except at an hourly level.  This would be for troubleshooting to narrow down a time window where something unexpected happened (ex: large spike of enrollments or very low enrollments for that time of day).
6. **Unenrollment Overall** and other Unenrollment charts provide data around unenrolled users.  This is used for flagging when there may be an issue.  We always expect some unenrollments.
