"use client";
import React, { useState } from "react";
import { Feature } from "geojson";

type Props = {
  features: Feature[];
};

const GeoJSONTable = ({ features }: Props) => {
  const [openFeatures, setOpenFeatures] = useState<number[]>([]);
  const [openProperties, setOpenProperties] = useState<{
    [key: number]: number[];
  }>({});

  const handleAccordionChange = (
    featureIndex: number,
    propertyIndex: number,
  ) => {
    const isOpenFeature = openFeatures.includes(featureIndex);
    const isOpenProperty =
      openProperties[featureIndex]?.includes(propertyIndex);

    setOpenFeatures(
      isOpenFeature
        ? openFeatures.filter((index) => index !== featureIndex)
        : [...openFeatures, featureIndex],
    );
    setOpenProperties({
      ...openProperties,
      [featureIndex]: isOpenProperty
        ? openProperties[featureIndex]?.filter(
            (index) => index !== propertyIndex,
          )
        : [...(openProperties[featureIndex] || []), propertyIndex],
    });
  };

  return (
    <div className="mb-2">
      {features.map((feature, featureIndex) => (
        <div key={featureIndex} className="flex items-center border-t py-2">
          <div className="mr-2">
            <strong>{featureIndex}</strong>
          </div>
          {feature.properties &&
            Object.entries(feature.properties).map(
              ([property, value], propertyIndex, arr) => (
                <div
                  key={propertyIndex}
                  className={`ml-2 inline-flex cursor-pointer items-center rounded-full border px-2 ${
                    openProperties[featureIndex]?.includes(propertyIndex)
                      ? "text-blue-500"
                      : ""
                  }`}
                  onClick={() =>
                    handleAccordionChange(featureIndex, propertyIndex)
                  }
                >
                  {`${property}`}
                  {openProperties[featureIndex]?.includes(propertyIndex) &&
                    ` | ${value}`}
                </div>
              ),
            )}
        </div>
      ))}
    </div>
  );
};

export default GeoJSONTable;
