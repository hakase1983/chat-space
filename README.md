# DB設計

 ## usersテーブル

 |Column|Type|Options|
 |------|----|-------|
 |email|string|null: false
 |password|string|null: false
 |name|string|null: false index: true

 ### Association
 - has_many :messages
 - has_many :groups, through :members
 - has_many :members

 ## messagesテーブル
 |Column|Type|Options|
 |------|----|-------|
 |image|text|null: false
 |body|text|null: false
 |user_id|references|null: false, foreign_key: true
 |group_id|references|null: false, foreign_key: true

  ### Association
 - belongs_to :group
 - belongs_to :user

 ## groupsテーブル
 |Column|Type|Options|
 |------|----|-------|
 |name|string|null: false

  ### Association
 - has_many :messages
 - has_many :users, through :members
 - has_many :members

 ## membersテーブル
 |Column|Type|Options|
 |------|----|-------|
 |user_id|references|null: false, foreign_key: true
 |group_id||references|null: false, foreign_key: true

  ### Association
  - belongs_to :user
  - belongs_to :group

