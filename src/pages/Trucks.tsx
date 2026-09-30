import VehicleTypePage from './VehicleTypePage'

export default function Trucks() {
  return (
    <VehicleTypePage
      title="Truck"
      seoTitle="Sell a Junk Truck in Illinois | Free Quote | Junk Car Cash Now LLC"
      seoDesc="Sell your old, junk, damaged, or non-running truck in Illinois. Pickup trucks, work trucks — any condition. Free quote from Junk Car Cash Now LLC."
      h1={`SELL YOUR JUNK TRUCK\nIN ILLINOIS`}
      intro="Old pickup trucks, damaged work trucks, or non-running commercial trucks — we buy trucks throughout Illinois."
      breadcrumbLabel="Trucks"
      image="https://images.unsplash.com/photo-1670931814837-72bdaa5e612a?w=1920&h=1080&fit=crop&auto=format"
      imageAlt="Truck on flatbed for junk removal in Illinois"
      description={[
        "Trucks represent a significant portion of the vehicles we evaluate and purchase in Illinois. Pickup trucks, light-duty work trucks, and medium-duty commercial trucks are all common requests.",
        "Whether you have an old pickup that no longer runs, a work truck that was damaged in an accident, or a commercial vehicle that's reached the end of its useful life — we can assess its value and arrange a pickup.",
        "Truck values vary based on year, make, model, condition, and the current market. Request a free quote to find out what your specific truck may be worth.",
      ]}
      conditions={[
        'Runs & Drives',
        "Doesn't Run",
        'Accident Damaged',
        'High Mileage',
        'Engine Problems',
        'Transmission Issues',
        'Frame Damage',
        'Flood Damaged',
      ]}
      benefits={[
        'Pickup trucks and work trucks considered',
        'Any make and model',
        'Any condition — running or not',
        'Flatbed towing for non-running trucks',
        'Illinois service area',
        'Free quote, no obligation',
      ]}
      faqs={[
        {
          question: 'Do you buy old pickup trucks in Illinois?',
          answer:
            "Yes. Old pickup trucks are one of the most common vehicles we receive quote requests for. Age and condition both factor into the offer — not the decision to evaluate.",
        },
        {
          question: 'Can you tow a non-running truck?',
          answer:
            "Yes. We arrange flatbed towing for non-running trucks. Make sure the truck is accessible at the scheduled pickup time.",
        },
      ]}
    />
  )
}
