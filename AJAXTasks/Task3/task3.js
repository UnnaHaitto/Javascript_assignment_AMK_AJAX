async function getData() {
  try {
    const response = await fetch("https://reqres.in/api/unknown/23");
    if (!response.ok) throw new Error("Invalid input!");
    const answer = await response.json();
    console.log(answer);
  } catch (error) {
    console.log(error.message);
  }
}

getData();
