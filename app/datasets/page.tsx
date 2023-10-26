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
    </div>
  );
}
