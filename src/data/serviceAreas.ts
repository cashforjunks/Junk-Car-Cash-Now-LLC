export interface ServiceArea {
  city: string
  state: string
  slug: string
  county: string
  population: string
  intro: string
  description: string
  localContext: string
  vehicles: string[]
  faqs: { q: string; a: string }[]
}

export const serviceAreas: ServiceArea[] = [
  {
    city: 'Chicago',
    state: 'IL',
    slug: 'chicago-il',
    county: 'Cook County',
    population: '2.7 million',
    intro: 'Serving all Chicago neighborhoods from the North Side to the South Side.',
    description:
      "Chicago's dense urban neighborhoods, from Rogers Park to Beverly, mean that old, non-running, and accident-damaged vehicles pile up. Whether your car sits in an alley, a driveway, or a city lot, Junk Car Cash Now LLC can arrange pickup across all of Chicago's 77 community areas.",
    localContext:
      "Chicago's public transit system means many residents own a second car that rarely moves — until it stops moving entirely. We serve all Chicago ZIP codes and can typically schedule same-week pickup.",
    vehicles: ['Cars', 'SUVs', 'Vans', 'Trucks', 'Minivans'],
    faqs: [
      {
        q: 'Do you pick up junk cars anywhere in Chicago?',
        a: 'Yes. We serve all Chicago neighborhoods and ZIP codes. Whether your vehicle is on the North Side, South Side, West Side, or downtown, we can arrange pickup.',
      },
      {
        q: 'Can I sell a car in Chicago without a title?',
        a: "Illinois law governs vehicle sales, including title requirements. We recommend contacting the Illinois Secretary of State's office for guidance on no-title situations. We can discuss your specific circumstances when you request a quote.",
      },
      {
        q: 'How quickly can you pick up in Chicago?',
        a: 'We aim to schedule pickup within a few business days in the Chicago area. Contact us for current availability.',
      },
    ],
  },
  {
    city: 'Aurora',
    state: 'IL',
    slug: 'aurora-il',
    county: 'Kane / DuPage County',
    population: '180,000+',
    intro: "Illinois' second-largest city with fast, convenient junk car pickup.",
    description:
      "Aurora spans both Kane and DuPage counties, making it one of the most geographically spread cities in Illinois. If you have a junk car, wrecked vehicle, or non-running truck sitting on your property in Aurora, we can schedule a pickup across all parts of the city.",
    localContext:
      "Aurora's mix of older neighborhoods and newer developments means a wide range of vehicle ages and conditions. We buy cars in any condition — from a 20-year-old sedan to a recently wrecked SUV.",
    vehicles: ['Cars', 'Trucks', 'SUVs', 'Vans'],
    faqs: [
      {
        q: 'Do you buy junk cars in Aurora, IL?',
        a: 'Yes. We serve Aurora and surrounding Kane and DuPage County areas. Request a free quote online to get started.',
      },
      {
        q: 'What condition does my car need to be in?',
        a: 'Any condition. Running, non-running, wrecked, flood damaged, or just old. We assess each vehicle individually.',
      },
    ],
  },
  {
    city: 'Joliet',
    state: 'IL',
    slug: 'joliet-il',
    county: 'Will County',
    population: '150,000+',
    intro: 'Junk car pickup throughout Joliet and Will County.',
    description:
      "Joliet is one of the fastest-growing cities in Illinois. From the historic downtown to the newer developments along Route 30 and I-80, vehicles of all types end up needing to be sold. Whether your car was in an accident, stopped running, or simply outlived its usefulness, we can provide a free quote and arrange pickup.",
    localContext:
      "Joliet's proximity to major interstates means we can efficiently serve the area. We buy cars, trucks, SUVs, and vans throughout Will County.",
    vehicles: ['Cars', 'Trucks', 'SUVs', 'Vans'],
    faqs: [
      {
        q: 'Can you pick up my junk car in Joliet?',
        a: 'Yes. We serve Joliet and surrounding Will County areas. Contact us for current availability and a free quote.',
      },
      {
        q: "Do you need the car's keys to pick it up?",
        a: "Keys are helpful but not always required. Let us know your situation when you request a quote and we'll discuss what's needed.",
      },
    ],
  },
  {
    city: 'Naperville',
    state: 'IL',
    slug: 'naperville-il',
    county: 'DuPage / Will County',
    population: '150,000+',
    intro: 'Free junk car quotes and pickup for Naperville and DuPage County.',
    description:
      "Naperville consistently ranks as one of Illinois's most desirable cities, but even here, vehicles age, get damaged, and stop running. Whether you have a collision-damaged car in a garage or a flood-damaged van sitting in a driveway, we can assess your vehicle and schedule a pickup.",
    localContext:
      'We serve both the DuPage and Will County portions of Naperville and surrounding communities.',
    vehicles: ['Cars', 'SUVs', 'Vans', 'Trucks'],
    faqs: [
      {
        q: 'Do you buy junk cars in Naperville, IL?',
        a: 'Yes. We serve Naperville and the broader DuPage County area. Request a free quote to get started.',
      },
    ],
  },
  {
    city: 'Elgin',
    state: 'IL',
    slug: 'elgin-il',
    county: 'Kane / Cook County',
    population: '115,000+',
    intro: 'Junk car buyers serving Elgin and Kane County.',
    description:
      "Elgin sits along the Fox River in Kane and Cook counties, and like many Illinois cities, has a significant number of residents with vehicles that have reached the end of their useful lives. We buy cars, trucks, and SUVs in any condition throughout Elgin.",
    localContext:
      "From the East Side to Elgin's south neighborhoods, we can reach your location and arrange a convenient pickup time.",
    vehicles: ['Cars', 'Trucks', 'SUVs', 'Vans'],
    faqs: [
      {
        q: 'Can you pick up my car anywhere in Elgin?',
        a: 'Yes. We serve all parts of Elgin and surrounding Kane County. Request a free quote online to get started.',
      },
    ],
  },
  {
    city: 'Schaumburg',
    state: 'IL',
    slug: 'schaumburg-il',
    county: 'Cook County',
    population: '74,000+',
    intro: 'Junk car removal and cash offers for Schaumburg and northwest suburbs.',
    description:
      "Schaumburg is the northwest Chicago suburb's commercial hub, but also home to tens of thousands of households — many of which have vehicles sitting unused, damaged, or non-running. We buy junk cars, wrecked vehicles, and old cars throughout Schaumburg and surrounding Cook County suburbs.",
    localContext:
      "Whether your vehicle is near Woodfield Mall, on a residential street, or in an apartment complex parking lot, we can arrange pickup.",
    vehicles: ['Cars', 'SUVs', 'Vans', 'Trucks'],
    faqs: [
      {
        q: 'Do you pick up junk cars in Schaumburg?',
        a: "Yes. Schaumburg and surrounding northwest suburbs are part of our service area. Request a free quote and we'll get back to you.",
      },
    ],
  },
  {
    city: 'Rockford',
    state: 'IL',
    slug: 'rockford-il',
    county: 'Winnebago County',
    population: '145,000+',
    intro: "Cash for junk cars in Rockford — Illinois' third-largest city.",
    description:
      "Rockford has a long automotive and manufacturing history, and many households have vehicles that have seen better days. Whether your car stopped running, was in an accident, or has simply aged beyond repair, we can provide a free quote and arrange pickup throughout Rockford.",
    localContext:
      "From the east side near Route 20 to the west side near the Rock River, we serve the full Rockford area and surrounding Winnebago County.",
    vehicles: ['Cars', 'Trucks', 'SUVs', 'Vans', 'Motorcycles'],
    faqs: [
      {
        q: 'Can you pick up a junk car in Rockford, IL?',
        a: 'Yes. We serve Rockford and the broader Winnebago County area. Request a free quote online or email us to get started.',
      },
      {
        q: 'Do you buy non-running cars in Rockford?',
        a: 'Absolutely. Non-running vehicles are among the most common types we buy. We arrange flatbed towing as needed.',
      },
    ],
  },
  {
    city: 'Evanston',
    state: 'IL',
    slug: 'evanston-il',
    county: 'Cook County',
    population: '74,000+',
    intro: 'Junk car pickup in Evanston and the north shore.',
    description:
      "Evanston is a dense, walkable North Shore community where many households own vehicles they no longer need — or vehicles that have broken down and aren't worth repairing. We provide free quotes and pickup for junk cars, damaged vehicles, and non-running cars throughout Evanston.",
    localContext:
      "From Dempster Street to the lakefront, we serve all Evanston neighborhoods. Tight alleys and city parking are not a problem — we have experience picking up vehicles in urban settings.",
    vehicles: ['Cars', 'SUVs', 'Vans'],
    faqs: [
      {
        q: 'Do you pick up junk cars in Evanston?',
        a: 'Yes. We serve Evanston and surrounding North Shore communities. Request a free quote online or email us.',
      },
    ],
  },
]

export function getServiceArea(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug)
}
