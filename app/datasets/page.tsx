import prisma from "@/lib/prisma";

async function getDatasets() {
  const response = await prisma?.dataset.findMany({});
  return response;
}

export default async function Page() {
  const ds = await getDatasets();

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
