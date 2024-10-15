import { db } from "../src/server/db";
console.log(db)
async function main() {
  const id = "cl9ebqhxk00003b600tymydho";
  await db.user.upsert({
    where: {
      id,
    },
    create: {
      id,
    },
    update: {},
  });
}

main()
  .then(async () => {
    console.log(db.user)
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
  
