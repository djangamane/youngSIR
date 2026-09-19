# Sir Montgomery — College Basketball Recruiting

Mobile-first recruiting profile for Sir Montgomery, a Class of 2027 combo guard at Clark High School in Las Vegas. The page puts his player profile, season production, film area, accomplishments, college exposure, schedule request, and recruiting contact within a few taps.

## Current profile data

The site uses the public 2025–26 Clark season profile currently available for Sir: 6′0″, 160 lb, 3.9 GPA, 4.2 APG, 106 total assists, 9.2 PPG, and 1.3 SPG. Replace these values in `src/App.jsx` when Stephanie confirms the preferred measurements or academic figure.

The accomplishments and exposure section includes the supplied State Champion, NXTPro Champion, AAU Offensive Player of the Year, University of Montana Mr. Grizz Award, Southern Utah Elite Camp, Long Beach State Nike Basketball Camp, and Colorado State visit details.

Film cards intentionally show “Film link to be added” until real YouTube, Hudl, or Veo URLs are supplied. Upcoming schedule currently says it is being finalized rather than inventing dates.

The temporary contact destination is Stephanie’s existing public Squad Beauty Professionals inbox. Update `profile.email` in `src/App.jsx` when the preferred recruiting email or phone is confirmed. Contact forms open a populated email draft and do not store submissions.

## Run and build

```sh
npm ci
npm run dev
npm run lint
npm run build
```

The production output is written to `dist/` and is ready for the existing Vercel deployment configuration.
