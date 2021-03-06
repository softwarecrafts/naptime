# naptime

Zzzzzz......

Playing with AWS lambda and snoozing slack every Thursday.

## TODO

- [ ] Read datetimes, duration & other config
  - [ ] from a file
  - [ ] from a db
    - [ ] provider table (Slack, Gmail)
    - [ ] account table (F4S, rocketspace, personal, work)
    - [ ] user table (Me!, Bruno etc)
    - [ ] snooze table (every thursday)
    - a provider can have users and accounts
    - a user can have multiple snoozes
    - a snooze belongs to a user & a account
    - a account can have many users, a user can have many accounts
- [ ] UX - slack commands
  - [ ] set a snooze
  - [ ] list snoozes
  - [ ] delete a snooze
  - [ ] generally think about syntax
  - [ ] one off vs repeat (calendar)
  - [ ] nlp - what is out there already?
- [ ] submitting to slack
- [ ] pricing (stripe?)
- [x] landing page (netlify)
- [ ] other notifications?
  - [ ] Gmail (OOO)
  - [ ] other chat providers
  - [ ] Chrome Extension (web notifications)
  - [ ] app notifications (mobile app)

a user creates multiple naps
a nap has a start datetime and end datetime
a nap has an optional text status and icon
a nap can snooze notifications
a nap can be applied to multiple accounts

an example of an account is a Slack Workspace
a Slack Workspace is associated with an email
an email can be associated with multiple Slack Workspaces
a workspace is is a type of provider

Start datetime
End datetime
Status
Optional Text Status - is this the end of onboarding? - do I have everything to schedule a single DnD on Slack?

CRON is for repeated tasks - what about one off tasks?
cron(Minutes Hours Day-of-month Month Day-of-week Year)

0. Add the Provider to the nap (essentially fully flesh out the Nap to be a actional unit of data)
1. Create the nap in faunaDB
2. Call a function to read naps from faunaDB and add them to [a Cron Service]

   - how should this function be called?
   - from the frontend - could do but opens naps to be in an unclean state/never getting scheduled if second request fails
   - from the previous function

   - every X period - NO
   - triggered from faunaDB - NO

- how should this function work?
  - should it be per nap/per user/globally?
    - faunaDB lends itself to globally
    - query all naps that have a state of 'new'
    - then

3. [Cron Service] calls faunaDB to read data to then execute the Naptime
   - this grabs the Slack user data and nap data from FaunaDB
   - makes the DnD API call to Slack
   - then update the status of the nap

## Notes

A user can currently create duplicate naps
Page animations for onboarding

Should a Nap have a state? - New, scheduled, Nap Started, Nap Finished
New --> Scheduled --> Nap Started --> Nap Finished (--> Scheduled)

- Status should be split - a dropdown with Online, Busy, Away, others? and a secondary text field for customised text

## delagatable type

bucket - thing people have access to. relationship between a thing (id) and people. - no content
bucketable - value of the bucket - eg. project name - immutable.

a recording is a piece of data - data to bucket
recordable - contains the content. - immutable

## API todo

- user auth with slack
- user auth with google (calendar)
- register, login, logout
- API setup
- build out the models
- build out the API itself
- convert the login/sign up views to be on brand

- could I convert the graphql view to be async? is that enabled in aridne?

- we have normal oauth2 to google to sign up.. this is done.
- how do we auth with the graphQL

- remove accounts if a user removes social connection

# May 2021

1. User signs up with Google
2. User adds Slack
3. Present Calendar to user (there maybe other options to display/other onboarding screens)
4. User creates a 'nap' on their calendar or selects an existing event to nap

   - Create a nap, that is linked to a calendar
   - Get an event from a the calendar
   - work out trigger for the nap

5. API to recieve nap and call the relevant APIs to perform the snoozes
   - What does authentication look like at this point? What type of OAuth2 do I need to support?
   - The queue calling back to naptime.
6. Drop on to the queue again to cancel snooze
7. ought to be the same as 5 with an extra hook

# snoozing

Default off

start a nap:
dnd - on
set status and icon
away
minutes = length of nap

end a nap
dnd - off
set default status and icon
auto
minutes = 0

Default on:
(every X time - set DND, away and icon)

start a 'nap'
dnd - off
icon & status
auto
mintues = length of nap

end a 'nap'
dnd - on
icon & status
away
minutes = 1 week

# brand/icon

setting sun on top
line
moon on the bottom

# Accounts TODO

- when defaults (dnd, icon, status) change properate these to the actual Slack account

# Next steps

- fetching calendar data on demand from the API
- events based on a date filter, it a week at a time?

- (re)Start the frontend!
- this means actually sorting out the auth flows...

## ideas

- split out schema into each django app?

## relay

https://relay.dev/docs/guides/graphql-server-specification/
https://relay.dev/assets/files/connections-61fc54c286f0afc0b4f230f7c4b150bf.htm#

# Oauth2 flow

- frontend calls to Google
  1. setup new frontend!
  2. Add Oauth library there...
  3. Configure Oauth ont the frontend
- That flowthen completes
- Frontend makes a call to the backend with
- Backend verifies token and gives the frontend our own token (wihc could be an outh access token?)
- Backend makes actual API requests to Google for Calendar stuff
