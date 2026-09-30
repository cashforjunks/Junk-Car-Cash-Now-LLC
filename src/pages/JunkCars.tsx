import VehicleTypePage from './VehicleTypePage'

export default function JunkCars() {
  return (
    <VehicleTypePage
      title="Junk Car"
      seoTitle="Junk Car Buyers in Illinois |  Junk Car Cash Now | Free Quote"
      seoDesc="We buy junk cars throughout Illinois. Any make, any model, any condition. Get a free no-obligation quote from Junk Car Cash Now LLC."
      h1={`JUNK CAR BUYERS\nIN ILLINOIS`}
      intro="We buy junk cars throughout Illinois. Any make, any model, any condition — get a free quote today."
      breadcrumbLabel="Junk Cars"
      image="https://images.unsplash.com/photo-1687867455489-bc2ad036b45a?w=1920&h=1080&fit=crop&auto=format"
      imageAlt="Junk cars in an Illinois scrapyard"
      description={[
        "A junk car is typically a vehicle that is no longer practical or economical to operate or repair. This includes old cars with high mileage, vehicles with significant mechanical issues, accident-damaged vehicles, flood-damaged cars, and cars that stopped running.",
        "Junk Car Cash Now LLC buys junk cars throughout Illinois. Whether your vehicle is parked in a driveway, stored in a garage, sitting in a lot, or taking up space in an alley — we can assess its value and arrange a pickup.",
        "The value of a junk car depends on several factors: the vehicle's year, make, and model, its condition, its location in Illinois, and current market conditions. Requesting a free quote is the first step toward finding out what your specific vehicle may be worth.",
      ]}
      conditions={[
        'Runs & Drives',
        'Runs but Has Issues',
        "Doesn't Run",
        'Wrecked',
        'Flood Damaged',
        'Fire Damaged',
        'Missing Parts',
        'High Mileage',
      ]}
      benefits={[
        'Free quote — no obligation',
        'We buy any make and model',
        'Any condition considered',
        'Flatbed towing for non-running vehicles',
        'Illinois service area',
        'Fast response to quote requests',
      ]}
      faqs={[
        {
          question: 'What makes a car a "junk car"?',
          answer:
            "A junk car is generally a vehicle that is no longer worth repairing or operating economically. This varies by vehicle and circumstance. If the cost of repairs or ongoing ownership exceeds what the vehicle is worth, it may qualify. The best way to find out is to request a free quote.",
        },
        {
          question: 'Do junk cars have any value?',
          answer:
            "Yes, many junk cars retain some value. Scrap metal value, parts value, and other factors can mean that even a completely non-running or extensively damaged vehicle has a quantifiable worth. We assess each vehicle individually.",
        },
        {
          question: 'Can I sell my junk car without a title in Illinois?',
          answer:
            "Title requirements are governed by Illinois law. If you don't have a title, contact us with your situation. We recommend also consulting the Illinois Secretary of State's office for guidance.",
        },
      ]}
    />
  )
}
