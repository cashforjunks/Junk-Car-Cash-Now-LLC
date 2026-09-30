import VehicleTypePage from './VehicleTypePage'

export default function DamagedCars() {
  return (
    <VehicleTypePage
      title="Damaged Car"
      seoTitle="Sell a Damaged Car in Illinois | Free Quote | Junk Car Cash Now LLC"
      seoDesc="Sell your damaged car in Illinois — flood damage, fire damage, hail damage, mechanical damage. Get a free no-obligation quote. Junk Car Cash Now LLC."
      h1={`SELL A DAMAGED\nCAR IN ILLINOIS`}
      intro="Flood damaged, fire damaged, hail damaged, or mechanically compromised — damaged vehicles may still have value. Get a free quote."
      breadcrumbLabel="Damaged Cars"
      image="https://images.unsplash.com/photo-1597328290883-50c5787b7c7e?w=1920&h=1080&fit=crop&auto=format"
      imageAlt="Damaged car assessed for sale in Illinois"
      description={[
        "A damaged car is one that has sustained significant damage that affects its value, safety, or operability. This includes vehicles with flood damage, fire damage, storm or hail damage, extensive mechanical failure, and structural damage from various causes.",
        "The extent and type of damage affects the offer we can make, but it does not eliminate the possibility of an offer. Many damaged vehicles retain scrap value, parts value, or other forms of worth even when they're no longer roadworthy.",
        "If you have a damaged car in Illinois that you want to sell, the first step is to request a free quote. Provide as much detail as you can about the damage when filling out the form — this helps us assess your vehicle accurately.",
      ]}
      conditions={[
        'Flood Damaged',
        'Fire Damaged',
        'Hail Damaged',
        'Storm Damaged',
        'Mechanical Failure',
        'Frame Damage',
        'Interior Damage',
        'Engine Failure',
      ]}
      benefits={[
        'Free quote for any type of damage',
        'Flood-damaged vehicles considered',
        'Fire-damaged vehicles considered',
        'Detailed damage description helps accuracy',
        'Flatbed towing for non-driveable vehicles',
        'Illinois service area',
      ]}
      faqs={[
        {
          question: 'Do you buy flood-damaged cars?',
          answer:
            "Yes. Flood-damaged vehicles may still have value depending on the extent of the damage. Provide as much detail as possible about the damage when requesting a quote — water damage level, whether the car runs, and any known mechanical issues.",
        },
        {
          question: 'Do you buy fire-damaged vehicles?',
          answer:
            "Yes. Fire-damaged vehicles are assessed individually. The extent of the damage, the vehicle's age and make/model, and other factors contribute to the offer.",
        },
        {
          question: 'What information should I provide about damage?',
          answer:
            "For best results, describe the type of damage (flood, fire, collision, mechanical), how severe it is, whether the vehicle runs, and any relevant history. The more detail you provide, the more accurately we can assess the vehicle.",
        },
      ]}
    />
  )
}
