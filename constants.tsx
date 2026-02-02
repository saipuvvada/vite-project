
import { Restaurant, MenuItem } from './types';

export const CATEGORIES = [
  {
    id: 'meals',
    title: 'Full Meals',
    description: 'Authentic Andhra Thalis & Main Courses',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1xl59k8aAKSKv4uk4ZYH4Nt5A7zpFpISCRvQCkJa26xsRO8sHdEwhhAuCKYmYrqKbzz7pmpNb60bfb_eBNb9WHarYnojSBV3_jvHhkbUqnjLIijzqjZ69w_lKhSIZmFI8EmzWOhUz5S1lsGHkRfbtPDLk4V76ZzqFs9m1CGAc-NFQ46LG3OdpIlIMmx9tpZL-sioQIWN2NUc7W32BZM2ki6nyw07p731W1dKAIPBUsIVeYv9CouvhEL3yDMPGOKcDWog6smSa_fDg',
    icon: 'restaurant'
  },
  {
    id: 'drinks',
    title: 'Drinks',
    description: 'Fresh Juices, Lassi & Soft Drinks',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAE4quIZz75LaNdpF5LGDrp7sctvAhPyx_EEoZ62_4MQv2BzflkBctbCo8cgDOFXYqbmyZH6XasLGMLP8ZWyvMZ8_8HI_GzxwBFEnGrWD12Kjiz7URON466wh6m_BOfN4I8MdLoQUEQcoy1HWGkYHfaCy4SP213SGX9wEKWD5-Sy06-fKuBTFKS9ROmnEhA1IaHpsyv7VcvnDhm_smqWVcAeMU-bwqDMnoqnjxzYE8Sw99O_SxlfSXCE7veJIemqn0JAGX-eB0UBjrx',
    icon: 'local_bar'
  },
  {
    id: 'fast-foods',
    title: 'Fast Foods',
    description: 'Snacks, Biryani & Street Specials',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApuw1ngXfR8ldjFIoucEjo4L2gl9bG6x6-TseldUj24ds-qIMjILoePsHCqbCbdKvwlKG1SBJ-bXJ4Acg4WqtXmZq5hAZAt9pcnGJocGN754NwieZBiqVnMCrgZGwBOhay9JyXXLQFn_BJlYxihtm70vU0NjZbOo8iLfrc8qyi4t9UmBKjyoCQ5tMkOKVRgjMPMOoCWonZ8DQjMf4vJf-l_pIwYCA7tasJ1hcLIzyHweHoLypM4rxsHwEopuK4gLW12JwRNHihkG2b',
    icon: 'fastfood'
  }
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'sv-grand',
    name: 'Sri Venkateswara Grand',
    location: 'Main Road, Karempudi',
    hours: '10:00 AM - 10:00 PM',
    rating: 4.2,
    tags: ['South Indian', 'Meals'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqD6nTuazk2Bw_3egVvIDzo8PLehOTuHR9WrVxx9TEzk5nVd1olRzjT9EV7eNeoLdHJNLs1TpC_GjOcQ3nkJvglIJcfa3S4gpAHbIX1JBvRjzxWxU3H4doyvwKtDi26yYAkL9ns0wv6j6lGYs3Blb6Rl5B0gBRYP1VIqnScZHNBIJbTwKLOJrLkqiko2CgonDr4glXNcW92tzYjm4ldxsoJeQlbYYkDUGvBYXaG0wsZBNhv8uoJFqB8Rb-ksNd2ukSBsL5LBJCTjoE',
    status: 'Open Now',
    category: 'South Indian'
  },
  {
    id: 'paradise',
    name: 'Paradise Biryani Point',
    location: 'Near RTC Bus Stand',
    hours: '12:00 PM - 11:00 PM',
    rating: 4.5,
    tags: ['Biryani', 'Tandoori'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzfHjlMrLnOXEREEFFi03ScliH7fFVqRHsLFpJawZEtJGiiV9Is-T3fp3j2IdScebRkbSA9Cq9t3tV0J0GUiw8V1peOTVw4JqCmGNeIBxabeGFfYKK7SF_qvxnlfzodnm9yO5zBt1nYqrsGYAGxYxcIXa8rBYFm4jH1xBvf1h86-zySQbvH9CrQMsrmzihs2eAK9MLxQFNvybO7XG1glWCjLiyha78mjhHxpvnMeBtwYBVyXYHithi_lbWTqvSwJUeCe6TF3a1tH_O',
    status: 'Trending',
    category: 'Biryani'
  },
  {
    id: 'kpd-fast-food',
    name: 'Karempudi Fast Food Center',
    location: 'Market Street, Karempudi',
    hours: '04:00 PM - 10:30 PM',
    rating: 3.9,
    tags: ['Noodles', 'Snacks'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRzM_JErb736471WSIIHJuqPSxg2PPurfSQYhitCL3ZijYQFAgBhP11zKb7ZNWHwYwdhVuANMFOb0VRUcLXlNNV2DiVYxajGLnFIYkMnU-trCOF0sZ7VkpOnGJMjWmgq9U44r6-kzmnyG-zuZTy-LhoXOkGyvLuNk_WDPQIuKSPql-vFUY0JrfG5LnOaLYOE_Dms6Y09FVoOcT5sJc4_NBvYdxXhUNIsIvtWK6JIsMH5ILsq9HSpMfaAHM474i9C1zKXilURgHqNNk',
    status: 'Pocket Friendly',
    category: 'Fast Foods'
  }
];

export const MENU_ITEMS: Record<string, MenuItem[]> = {
  'sv-grand': [
    {
      id: 'm1',
      name: 'Ghee Roast Dosa',
      price: 70,
      description: 'Crispy fermented crepe cooked with pure desi ghee. Served with ginger chutney and sambar.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-g0jXtv3ErHm6j6LU6PX9D1AqQpnjYGOfyBJImQw9L61s6B9B7lA4mPGR5u69GiPopaSCvDyPta3MqH6ecoHGtAKS92GR7lulXwAEcOo-i6S1fJX0jzqhcstcKiTm22uojMujRjT83Dp4YPQXJG-5mSlCzp6u8Wt4_QcIMdDqd6DiViGYRmKXzt1YvzdXoQHwQ2QjL51v5lVMJFHbGAiqWwmG0zr1X-7PsNN1ajM5m6R1MFkjZQOlpZhQ2NvimLGhIrj1nZn6Qm7D',
      type: 'veg',
      category: 'Bestsellers'
    },
    {
      id: 'm2',
      name: 'Special South Thali',
      price: 120,
      description: 'Rice, Dal, 2 Veg Curries, Sambar, Rasam, Curd, Appalam, and Sweet.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzDIAGgLb5qwoNzbFvTv8w-ybtxQYK_bYBGH4VJcbRDyCRmA8JJ4LQT0nJyHylUX0zbz6dFlUPgFrNbvStJs97KP53dnhEKzzj7Z7vapUZVXv2LNdcaIQPOS0WvmEo_B8qjU0XrA8Nc79K_jFqSYdiTQex1l6wHJ4xjwDz25jcPwwsK483-UiQCHUEBCeOxbcTHKCZBLxrPv7bSjNgbPt7pFUAGsDzTKMzgZfDGXCli5DNbfnTCQu3bsAaQRsxKKxrWcXoKkt2PswO',
      type: 'veg',
      category: 'Bestsellers'
    }
  ],
  'paradise': [
    {
      id: 'p1',
      name: 'Chicken Dum Biryani',
      price: 180,
      description: 'Authentic Hyderabadi style spicy dum biryani with 2 pieces of tender chicken.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATtihk1QUNQOds9XF86mH9swPSQxFZPA5fWYo1wVyVGEunFo7Vg3CkY1UK9XGVKPt4d55rydVDCpfCvgQ4Vnk3IkDX5-FGgR5y-P-LKc2D0eiyIb8M6RAmsxQwMaKHLUBiD4d5-xLsQdE4xYCaosApL3BDKprFDWLtjpBjzCDnzyMsSLve4InXmByOns0dkPLjUOUtPA2NCIeZZq_YaBQdLDuMG9TtODwQPqXP_0sMIiAf8fOLepe_WZGBMyLsB1I1UwnB8tzf9feo',
      type: 'non-veg',
      category: 'Bestsellers'
    }
  ]
};
