async function getData() {
  try {
    const response = await fetch("https://reqres.in/api/users/1", {
      headers: {
        "x-api-key": "free_user_3LClQaP4k6ktZ4bcHSk0M5TjfJO",
      },
    });
    if (!response.ok) throw new Error("Invalid input!");
    const answer = await response.json();
    console.log(answer);
  } catch (error) {
    console.log(error.message);
  }
}

getData();
