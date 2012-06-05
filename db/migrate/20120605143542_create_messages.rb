class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string    :author
      t.string    :body
      t.timestamp :timestamp
      t.timestamps
    end
  end
end
