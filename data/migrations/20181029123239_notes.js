
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', function(notes) {
        notes.increments();

        notes.string('name', 80).notNullable();
        notes.text('description').notNullable(); 
        notes.boolean('completed').defaultTo(false);
    
    });
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
  
};
