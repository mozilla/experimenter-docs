## How many branches can I have?
While you might want to try out lots of variations for your experiment - each variation reduces your chance of detecting changes.  We highly recommend running as few variations as possible.   
Trying to cram too many changes into one experiment, can lead to learning nothing about all branches.  

This is discussed in [office hours for mobile or desktop](https://mozilla-hub.atlassian.net/wiki/spaces/DATA/pages/6849684/Office+Hours) when you review your experiment with data science.

We aim to see statistically significant changes, also know as changes that aren’t likely to have been caused by chance.  
In order to find a statistically significant change we need a large enough population size that we can say “we’d expect to see this same change if we repeated this experiment 95 out of 100 times”.  

Stat significant changes are more detectable if:
1. The change caused a big impact in what you are measuring.  It takes fewer users per branch to detect if a 5% change was by chance, then if a 1% chance was by chance.
2. If everyone encounters the scenario your change impacts.  If you are looking to change something in PDF and only 5% of people use the PDF feature - you will need a large audience size for EACH branch.  
3. We run on enough users so we can detect smaller changes .5-2%.   Going to more users is decided based on a few factors: 1. Risk - if there is a possible negative risk to user experience, stability, or revenue, 2. What else is running? Would you be taking up all the experimentation for an area).

Before adding more branches - you should always:
1. Consider if this might be good to break into multiple experiments.  Learning the most critical aspects first with 2-4 branches.  
2. Are there other ways to learn this?  Experiments provide data.  If you are looking for qualitative feedback on what users like or if they understand the flow - consider usertesting first.  Then run an experiment on the winners from user testing.
