import VehicleTypePage from './VehicleTypePage'

export default function WreckedCars() {
  return (
    <VehicleTypePage
      title="Wrecked Car"
      seoTitle="Sell a Wrecked Car in Illinois |  Junk Car Cash Now | Free Quote"
      seoDesc="Sell your wrecked or totaled car in Illinois. Collision-damaged vehicles bought as-is. Free no-obligation quote from Junk Car Cash Now LLC."
      h1={`SELL YOUR WRECKED\nCAR IN ILLINOIS`}
      intro="Collision-damaged, totaled, or extensively wrecked — we buy wrecked cars in Illinois in any condition."
      breadcrumbLabel="Wrecked Cars"
      image="https://images.unsplash.com/photo-1713623311317-d3c43a4be4cf?w=1920&h=1080&fit=crop&auto=format"
      imageAlt="Wrecked car after collision damage in Illinois"
      description={[
        "A wrecked car is one that has been damaged in a collision — whether a minor fender-bender or a total loss. Insurance companies often declare vehicles 'totaled' when the cost of repair approaches or exceeds the vehicle's value, but a totaled car still has value as salvage, parts, or scrap.",
        "If your car has been in an accident in Illinois and you're wondering what to do with it, Junk Car Cash Now LLC can provide a free quote. We buy wrecked vehicles in various states of damage — from vehicles with front-end damage to extensively wrecked total losses.",
        "The severity of damage, along with the vehicle's year, make, model, and your Illinois location, all factor into the offer we can make. The only way to know what your specific wrecked car is worth is to request a free quote.",
      ]}
      conditions={[
        'Front-End Collision',
        'Rear-End Collision',
        'Side Impact',
        'Rollover',
        'Total Loss / Totaled',
        'Salvage Title',
        'Frame Damage',
        'Multiple Impact Points',
      ]}
      benefits={[
        'Wrecked and totaled vehicles considered',
        'Salvage title vehicles accepted',
        'We assess every vehicle individually',
        'Flatbed towing available',
        'No need to repair before selling',
        'Free quote, no obligation',
      ]}
      faqs={[
        {
          question: 'Can I sell a totaled car in Illinois?',
          answer:
            "Yes. A vehicle declared a total loss by an insurance company still has value as salvage. We buy totaled vehicles throughout Illinois. The specifics of your situation, including title status, will factor into the process.",
        },
        {
          question: 'Do I need to fix the damage before selling?',
          answer:
            "No. We buy wrecked cars as-is. There's no need to repair the vehicle before requesting a quote or arranging a sale.",
        },
        {
          question: "What if I don't have a title for my wrecked car?",
          answer:
            "Title requirements depend on Illinois law and your specific circumstances. Contact us with your situation and we can discuss it. We also recommend consulting the Illinois Secretary of State's office for guidance.",
        },
      ]}
    />
  )
}
