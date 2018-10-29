
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', function(notes) {
        notes.increments();

        notes
        .integer('note_id')
        .string('name', 80).notNullable()
        .text('description').notNullable()
        .boolean('completed').defaultTo(false);
    
    });
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
  
};
