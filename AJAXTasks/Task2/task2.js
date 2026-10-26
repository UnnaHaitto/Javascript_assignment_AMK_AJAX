async function getData() {
  const workers = [
    {
      name: "Milli",
      job: "Wine taster",
    },
    {
      name: "Otto",
      job: "Bus driver",
    },
    {
      name: "Maiju",
      job: "CEO",
    },
    {
      name: "Konsta",
      job: "CFO",
    },
    {
      name: "Okko",
      job: "Operating manager",
    },
  ];

  const data = {
    body: JSON.stringify(workers),
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const response = await fetch("https://reqres.in/api/users", data);
    if (!response.ok) throw new Error("Invalid input!");
    const answer = await response.json();
    console.log(answer);
  } catch (error) {
    console.log(error.message);
  }
}

getData();
