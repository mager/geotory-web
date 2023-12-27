export default async function Page() {
  return (
    <div>
      <div>
        <h1 className="text-2xl text-black">
          Let&lsquo;s explore some datasets!
        </h1>
      </div>
      <div>
        <h2>Free and open data sources</h2>
        <ul>
          <li>
            <a href="https://www.census.gov/cgi-bin/geo/shapefiles/index.php">
              TIGER/Line® Shapefiles
            </a>
            - Geodata from the US Census Bureau
          </li>
        </ul>
      </div>
      <div>
        <h2>Learn about geodata!</h2>
        <ul>
          <li>
            <a href="https://www.esri.com/en-us/what-is-gis/overview">
              ESRI - What is GIS?
            </a>
            - Great overview of GIS from the experts
          </li>
          <li>
            <a href="https://terraformer-js.github.io/glossary/">
              Terraformer Glossary
            </a>
            - Nice resource for understanding GeoJSON
          </li>
        </ul>
      </div>
    </div>
  );
}
