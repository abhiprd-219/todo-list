import { faker } from '@faker-js/faker';
import sql from './db.js'; // Assuming your database connection is in a file named `db.js`

class Task {
    static createFakeTasks(result) {
        const batchSize = 1000; // Insert in batches for efficiency
        const totalTasks = 900000;
        let insertedCount = 0;

        const insertBatch = (batchData) => {
            const placeholders = batchData.map(() => '(?, ?, ?, ?)').join(', ');
            const values = batchData.flat();

            sql.query(
                `INSERT INTO tasks (title, description, is_completed, due_date) VALUES ${placeholders}`,
                values,
                (err) => {
                    if (err) {
                        console.error("Error inserting tasks: ", err);
                        result(err, null);
                        return;
                    }

                    insertedCount += batchSize;
                    console.log(`${insertedCount} tasks inserted so far...`);

                    if (insertedCount < totalTasks) {
                        generateAndInsertBatch();
                    } else {
                        console.log("All tasks inserted successfully!");
                        result(null, { message: "100,000 tasks inserted successfully!" });
                    }
                }
            );
        };

        const generateAndInsertBatch = () => {
            const batchData = [];
            for (let i = 0; i < batchSize; i++) {
                const title = faker.lorem.words(5); // Generate a random task title
                const description = faker.lorem.sentences(2); // Generate a random description
                const status = 0;// Random status
                const due_date = faker.date.future(); // Generates a future date


                batchData.push([title, description, status, due_date]);
            }
            insertBatch(batchData);
        };

        // Start generating and inserting data
        generateAndInsertBatch();
    }
}

export default Task;
