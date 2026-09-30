import VehicleTypePage from './VehicleTypePage'

export default function Vans() {
  return (
    <VehicleTypePage
      title="Van"
      seoTitle="Sell a Junk Van in Illinois | Free Quote | Junk Car Cash Now LLC"
      seoDesc="Sell your old, junk, or non-running van in Illinois. Minivans, cargo vans, passenger vans — any condition. Free quote. Junk Car Cash Now LLC."
      h1={`SELL YOUR JUNK VAN\nIN ILLINOIS`}
      intro="Minivans, cargo vans, passenger vans — any condition, any make and model. Get a free quote for your van in Illinois."
      breadcrumbLabel="Vans"
      image="https://images.unsplash.com/photo-1687867456092-9717ce223658?w=1920&h=1080&fit=crop&auto=format"
      imageAlt="Junk van for sale in Illinois"
      description={[
        "Vans include a wide range of vehicles: minivans used for family transportation, cargo vans used for work, and passenger vans. Each type is common in Illinois and each may reach a point where selling makes more sense than continuing to own.",
        "If your minivan stopped running, your cargo van has sustained damage, or your passenger van has simply aged beyond practical use — we can assess its value and arrange a pickup.",
        "We buy vans in any condition throughout Illinois. Request a free quote to find out what your specific van may be worth.",
      ]}
      conditions={[
        'Runs & Drives',
        "Doesn't Run",
        'Minivan',
        'Cargo Van',
        'Passenger Van',
        'Damaged',
        'High Mileage',
        'Transmission Issues',
      ]}
      benefits={[
        'Minivans, cargo vans, passenger vans',
        'Any condition — running or not',
        'Flatbed towing available',
        'Free quote, no obligation',
        'Illinois service area',
        'Fast response',
      ]}
      faqs={[
        {
          question: 'Do you buy old minivans?',
          answer:
            "Yes. Old and non-running minivans are a common type of vehicle we evaluate in Illinois. Request a free quote for yours.",
        },
        {
          question: 'What about work or cargo vans?',
          answer:
            "Yes. We buy cargo vans and work vehicles along with other van types. Any make, any model, any condition.",
        },
      ]}
    />
  )
}
