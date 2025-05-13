type Route = {
  city: City;
  price: number;
};

class City {
  readonly name: string;
  readonly routes: Route[];

  constructor(name: string) {
    this.name = name;
    this.routes = [];
  }

  addRoute(city: City, price: number) {
    this.routes.push({ city, price });
  }
}

const atlanta = new City("Atlanta");
const boston = new City("Boston");
const chicago = new City("Chicago");
const denver = new City("Denver");
const elPaso = new City("El Paso");

atlanta.addRoute(boston, 100);
atlanta.addRoute(denver, 160);
boston.addRoute(chicago, 120);
boston.addRoute(denver, 180);
chicago.addRoute(elPaso, 80);
denver.addRoute(chicago, 40);
denver.addRoute(elPaso, 140);

function dijkstraShortestPath(
  startingCity: City,
  destinationCity: City
): string[] {
  let cheapestPricesTable = new Map<string, number>(); // city name, cost from origin
  let cheapestPreviousStopoverCity = new Map<City, City>(); // city, and the city you need to visit before this one
  let unvisitedCities = new Map<City, boolean>(); // known, but unvisited
  let visitedCities = new Map<string, boolean>(); // using map because we'll be doing lookups

  // costs 0 to get to first city
  cheapestPricesTable.set(startingCity.name, 0);

  // core algorithm
  // runs as long as we visit a city we haven't visited yet
  let currentCity = startingCity;
  while (currentCity) {
    // add the currentCity to visitedCities to record we've visited it
    visitedCities.set(currentCity.name, true);
    // and remove it from unvisited cities
    unvisitedCities.delete(currentCity);

    // now iterate over each of the current city's (vertexes) adjacent cities (edge)
    for (const route of currentCity.routes) {
      // if new city, add to unvisitedCities
      if (!visitedCities.has(route.city.name)) {
        unvisitedCities.set(route.city, true);
      }

      // calculate price of getting from the STARTING city to the ADJACENT city using the CURRENT city as the penultimate stop
      const pricethroughCurrentCity =
        cheapestPricesTable.get(currentCity.name) + route.price;

      // if price from STARTING city to the ADJACENT city is cheapest we've found so far
      if (
        !cheapestPricesTable.get(route.city.name) ||
        pricethroughCurrentCity < cheapestPricesTable.get(route.city.name)
      ) {
        // update the two tables
        cheapestPricesTable.set(route.city.name, pricethroughCurrentCity);
        cheapestPreviousStopoverCity.set(route.city, currentCity);
      }
    }

    // visit next unvisited city
    // remember, we choose the one that is cheapest from the STARTING city
    // TODO: replace with priority queue
    let cheapestPriceFoundSoFar = Infinity;
    if (unvisitedCities.size) {
      for (const city of unvisitedCities) {
        if (cheapestPriceFoundSoFar > cheapestPricesTable.get(city[0].name)) {
          cheapestPriceFoundSoFar = cheapestPricesTable.get(city[0].name);
          currentCity = city[0];
        }
      }
    } else {
      break;
    }
  }

  let shortestPath = [];

  // work backward from destinationCity
  currentCity = destinationCity;

  // loop until we reach the starting city
  while (currentCity !== startingCity) {
    // add each current city name we encounter to the shortest path array
    shortestPath.push(currentCity.name);
    // use cheapest previous stopover city to follow each city to previous stopover city
    currentCity = cheapestPreviousStopoverCity.get(currentCity);
  }

  // finally, we add the starting city
  shortestPath.push(startingCity.name);

  // reverse the list because we started at the destination
  return shortestPath.reverse();
}

console.log(dijkstraShortestPath(atlanta, elPaso));
