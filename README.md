# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

 ## usersテーブル

 |Column|Type|Options|
 |------|----|-------|
 |email|string|null: false
 |password|string|null: false
 |name|string|null: false

 ### Association
 - has_many :messages
 - has_many :groups, through :members

 ## messagesテーブル
 |Column|Type|Options|
 |------|----|-------|
 |text|text|null: false
 |user_id|integer|null: false, foreign_key: true
 |group_id|integer|null: false, foreign_key: true

  ### Association
 - belongs_to :group
 - belongs_to :user

 ## groupsテーブル
 |Column|Type|Options|
 |------|----|-------|
 group_name|string|null: false

  ### Association
 - has_many :messages
 - has_many :users, through :members

 ## membersテーブル
 |Column|Type|Options|
 |------|----|-------|
 |user_id|integer|null: false, foreign_key: true
 |group_id||integer|null: false, foreign_key: true

  ### Association
  - belongs_to :user
  - belongs_to :group

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
