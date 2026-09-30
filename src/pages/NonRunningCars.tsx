import VehicleTypePage from './VehicleTypePage'

export default function NonRunningCars() {
  return (
    <VehicleTypePage
      title="Non-Running Car"
      seoTitle="Sell a Non-Running Car in Illinois | Free Quote | Junk Car Cash Now LLC"
      seoDesc="Sell your non-running car in Illinois. Won't start, dead engine, transmission failure — we buy non-running vehicles. Free quote. Junk Car Cash Now LLC."
      h1={`SELL YOUR NON-RUNNING\nCAR IN ILLINOIS`}
      intro="Won't start, won't run, won't move — non-running vehicles are among the most common types we buy. Get a free quote."
      breadcrumbLabel="Non-Running Cars"
      image="https://images.unsplash.com/photo-1687867452629-a8c337d0e72e?w=1920&h=1080&fit=crop&auto=format"
      imageAlt="Non-running junk car in Illinois"
      description={[
        "A non-running car is one that won't start or can no longer be driven. This includes vehicles with dead engines, failed transmissions, blown head gaskets, seized engines, dead batteries with underlying electrical issues, and other mechanical failures that make the car inoperable.",
        "Non-running vehicles are among the most common types of cars we receive quote requests for in Illinois. Many people have a car sitting in their driveway, garage, or parking spot that hasn't moved in months or years. If that sounds familiar, we can help.",
        "We arrange flatbed towing for non-running vehicles, so there's no need for the car to start or move under its own power. Provide your vehicle details and location, and we'll take care of the rest.",
      ]}
      conditions={[
        "Won't Start",
        'Dead Engine',
        'Transmission Failure',
        'Seized Engine',
        'Electrical Failure',
        'Blown Head Gasket',
        'Catastrophic Mechanical Failure',
        'Unknown Cause',
      ]}
      benefits={[
        'Flatbed towing for non-running vehicles',
        "No need for the car to start or drive",
        'Free quote — no obligation',
        'We assess every vehicle individually',
        'Illinois service area',
        'Any make and model considered',
      ]}
      faqs={[
        {
          question: 'Can you pick up a car that doesn\'t run?',
          answer:
            "Yes. We use flatbed tow trucks for non-running vehicle pickups. The car doesn't need to start or move under its own power. Make sure the vehicle is accessible to a tow truck at the scheduled pickup time.",
        },
        {
          question: "What if I don't know why my car doesn't run?",
          answer:
            "That's fine. Select 'Unknown' for the condition question in the quote form, and add any relevant details in the notes field. We'll work with the information available.",
        },
        {
          question: 'Do non-running cars have value?',
          answer:
            "Yes, many non-running cars retain value in various forms — scrap metal, individual parts, and other factors. Every vehicle is different. The best way to find out is to request a free quote.",
        },
      ]}
    />
  )
}
