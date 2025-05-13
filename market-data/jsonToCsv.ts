const json = {
  title:
    "Apple iPhone 4S Sale Cancelled in Beijing Amid Chaos (Design You Trust)",
  description:
    "Advertise here with BSA Apple cancelled its scheduled sale of iPhone 4S in one of its stores in China\u2019s capital Beijing on January 13. Crowds outside the store in the Sanlitun district were waiting on queues overnight. There were incidents of scuffle between shoppers and the store\u2019s security staff when shoppers, hundreds of them, were told that the sales [...]Source : Design You TrustExplore : iPhone, iPhone 4, Phone",
  link: "http://wik.io/info/US/309201303",
  timestamp: 1326439500,
  image: null,
  embed: null,
  language: null,
  user: null,
  user_image: null,
  user_link: null,
  user_id: null,
  geo: null,
  source: "wikio",
  favicon: "http://wikio.com/favicon.ico",
  type: "blogs",
  domain: "wik.io",
  id: "2388575404943858468",
};

function jsonToCsv(jsonData: object) {
  // if (!jsonData) return '';
  const headers = Object.keys(jsonData);
  const csvRows = [headers.join(",")];

  const row = headers.map((header) => JSON.stringify(jsonData[header] || ""));
  csvRows.push(row.join(","));
  console.log(csvRows.join("\n"));
}

jsonToCsv(json);
