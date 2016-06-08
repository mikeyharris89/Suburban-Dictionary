class AddAttachmentImageToTerms < ActiveRecord::Migration
  def self.up
    change_table :terms do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :terms, :image
  end
end
