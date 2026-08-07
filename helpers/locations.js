const locations = [
    {
        'display_name': 'Head Office',
        'company_id': 94,
        'api': "kvbNsweN9Tu7h+JzmUcmUHMkdyLF6JhWMWGYP3vGgeM="
    },
    {
        'display_name': 'Wetherill Park',
        'company_id': 74,
        "api": "zXPZtj1c5jfLXggSn3MuTp7tonJi1ehO4eAXptyz+GU="
    },
    {
        'display_name': 'Kotara',
        'company_id': 80,
        'api': "95K9mDPplmTMhSoEuTapT9v1EBBWSD9/5WesyeuPZSw="
    },
    {
        'display_name': 'Southbank',
        'company_id': 89,
        'api': "iinviHOHcEYCWIUEUZ4a86dMAC4eBmOKVMDMqsiNGEA="
    },
    {
        'display_name': 'Castle Hill',
        'company_id': 91,
        'api': "uz/QYAvE1/qWolKuQDJRKzr2upHUMjxlH5kw81vlaus="
    },
    {
        'display_name': 'Carlton',
        'company_id': 92,
        'api': "G76A+HO16Tzaek0HKBresvNg/ce4AESHLHrjogtQC2w="
    },
    {
        'display_name': 'Parramatta',
        'company_id': 164,
        'api': "wfp3Y84Ji5rnb96sME0iM+iz4goWzCxo9xHflDlb4lA="
    },
    {
        'display_name': 'Brighton-Le-Sands',
        'company_id': 169,
        'api': "wfp3Y84Ji5rnb96sME0iM+iz4goWzCxo9xHflDlb4lA="
    },
    {
        'display_name': 'Karrinyup',
        'company_id': 231,
        'api': "wfp3Y84Ji5rnb96sME0iM+iz4goWzCxo9xHflDlb4lA="
    },
    {
        'display_name': 'Carousel',
        'company_id': 93,
        'api': "wfp3Y84Ji5rnb96sME0iM+iz4goWzCxo9xHflDlb4lA="
    },
];

/* A venue that is not trading yet has its order/booking url set to the plain
   homepage in WordPress. Those render as a dead OPENING SOON button and turn
   back into a live link on their own once a real url is saved. */
export function isOpeningSoon(url) {
    return /^https?:\/\/(www\.)?crinitis\.com\.au\/?$/i.test((url || '').trim());
}

export function getLocationDetails(page = 'contact') {
    if (page === 'la-famiglia') {
        let temp = [];
        for (let i = 0; i < locations.length; i++) {
            if (i === 0) {
                continue;
            }
            temp.push(locations[i]);
        }

        return temp;
    }

    return locations;
}