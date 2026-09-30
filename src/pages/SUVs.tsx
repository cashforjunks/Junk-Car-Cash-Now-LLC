import VehicleTypePage from './VehicleTypePage'

export default function SUVs() {
  return (
    <VehicleTypePage
      title="SUV"
      seoTitle="Sell a Junk SUV in Illinois | Free Quote | Junk Car Cash Now LLC"
      seoDesc="Sell your old, junk, damaged, or non-running SUV in Illinois. Any make and model, any condition. Free quote. Junk Car Cash Now LLC."
      h1={`SELL YOUR JUNK SUV\nIN ILLINOIS`}
      intro="Old, damaged, wrecked, or non-running SUVs bought throughout Illinois. Get a free no-obligation quote."
      breadcrumbLabel="SUVs"
      image="https://images.unsplash.com/photo-1610641018556-030e920d6999?w=1920&h=1080&fit=crop&auto=format"
      imageAlt="SUV for junk car sale in Illinois"
      description={[
        "Sport utility vehicles are among the most popular vehicle types on Illinois roads — and they also represent a significant portion of the junk, damaged, and non-running vehicles that owners look to sell.",
        "Whether it's an aging SUV with high mileage, a collision-damaged crossover, or a flood-damaged vehicle, we buy SUVs in Illinois in any condition. All makes and models are considered.",
        "SUV values vary based on year, make, model, condition, and market factors. Request a free quote to find out what your specific vehicle may be worth.",
      ]}
      conditions={[
        'Runs & Drives',
        "Doesn't Run",
        'Collision Damaged',
        'Flood Damaged',
        'High Mileage',
        'Engine Problems',
        'Transmission Issues',
        'Wrecked / Total Loss',
      ]}
      benefits={[
        'All SUV makes and models considered',
        'Any condition — running or not',
        'Flatbed towing for non-running SUVs',
        'Free quote, no obligation',
        'Illinois service area',
        'Fast response to quote requests',
      ]}
      faqs={[
        {
          question: 'Do you buy non-running SUVs?',
          answer:
            "Yes. Non-running SUVs are among the most common vehicles we evaluate. We arrange flatbed towing for pickup.",
        },
        {
          question: 'What SUV makes and models do you buy?',
          answer:
            "We consider all makes and models — domestic and import, older models and recent ones. The vehicle's age, condition, and your Illinois location all factor into the offer.",
        },
      ]}
    />
  )
}
