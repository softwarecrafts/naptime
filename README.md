# snoozebot

Zzzzzz......


Playing with AWS lambda and snoozing slack every Thursday.


## TODO

* [ ] Read datetimes, duration & other config 
    * [ ] from a file
    * [ ] from a db
        * [ ] provider table (Slack, Gmail)
        * [ ] account table (F4S, rocketspace, personal, work)
        * [ ] user table (Me!, Bruno etc)
        * [ ] snooze table (every thursday)
        * a provider can have users and accounts
        * a user can have multiple snoozes
        * a snooze belongs to a user & a account
        * a account can have many users, a user can have many accounts
* [ ] per user snoozing
* [ ] how to manage multiple snoozes (multiple lambdas?- possibly costly)
* [ ] UX - slack commands
  * [ ] set a snooze
  * [ ] list snoozes
  * [ ] delete a snooze
  * [ ] generally think about syntax
  * [ ] one off vs repeat (calendar)
  * [ ] nlp - what is out there already?
* [ ] submitting to slack
* [ ] pricing (stripe?)
* [ ] landing page (netlify)
* [ ] other notifications? 
  * [ ] Gmail 
  * [ ] other chat providers
