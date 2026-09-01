export default function Terms() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-20 font-mono text-[#1a1a1a]">
      <h1 className="text-xl font-bold uppercase tracking-widest mb-8">Terms of Service</h1>
      <p className="text-[11px] text-[#6f6d66] mb-10">Last updated: August 2026</p>

      <Section title="What Nabhya is">
        Nabhya estimates a near-NDVI vegetation index from standard RGB drone imagery. It is an
        ordinal, uncalibrated index — not a physical NDVI measurement.
      </Section>

      <Section title="Validated crops and growth stages">
        <strong>Rice:</strong> validated in real field trials at 12–20m AGL, DJI-class sensors, on
        alluvial soil (India).
        <br /><br />
        <strong>Wheat, barley, and soybean:</strong> validated with statistically tested results
        against open UAV multispectral field-trial imagery (East Kazakhstan), from
        early-vegetative growth through maturity/heading. These three crops have not yet been
        cross-validated against Indian field conditions, soil type, or altitude/sensor
        combinations — treat this as validated in principle, pending confirmation on your actual
        deployment conditions.
        <br /><br />
        Across all validated crops, performance is <strong>not validated at true pre-emergence /
        bare-soil capture</strong> (fields with minimal or no visible vegetation) — a
        vegetation-presence limitation that can occur early in the season for any crop, not a
        crop-specific restriction.
        <br /><br />
        One further carve-out: soybean&apos;s pod-development stage has inconclusive validation
        results (difference against simple baseline methods was not statistically distinguishable
        from noise at current sample size). Treat pod-development-stage soybean output with the
        same caution as an unvalidated crop until further testing narrows this.
        <br /><br />
        Use outside these validated crops or growth windows is unsupported and results should be
        treated with reduced confidence.
      </Section>

      <Section title="GeoTIFF output and accuracy">
        Where available (requires GPS EXIF in the uploaded image and a supplied GSD value),
        Nabhya can return a georeferenced GeoTIFF. This is a north-up affine approximation
        anchored to a single EXIF GPS point — it is not a photogrammetrically corrected
        orthomosaic and does not account for flight heading, lens distortion, or terrain relief.
        Positional accuracy is approximate and should not be relied upon for survey-grade,
        legal-boundary, or precision-application (e.g., variable-rate spraying) purposes without
        independent verification.
      </Section>

      <Section title="No warranty, not for critical decisions">
        The service is provided &quot;as is.&quot; Nabhya is a scouting and prioritisation aid, not a
        substitute for ground-truth agronomic judgment. It must not be used as the sole basis for
        financial, insurance, or regulatory determinations.
      </Section>

      <Section title="Free tier & rate limits">
        The demo endpoint is rate-limited and provided without an uptime guarantee. Programmatic
        (API-key) access is subject to the limits and terms agreed at the time a key is issued.
      </Section>

      <Section title="Your imagery">
        You retain ownership of any imagery you submit. We do not claim rights over it and do not
        retain it beyond the processing of your request (see our Privacy Policy).
      </Section>

      <Section title="Acceptable use">
        Don&apos;t attempt to overload, reverse-engineer, or extract our underlying model weights via
        the API, and don&apos;t submit imagery you don&apos;t have the right to process.
      </Section>

      <Section title="Limitation of liability">
        To the extent permitted by law, Nabhya is not liable for decisions made using its output,
        including crop-input, spray, or investment decisions, and including decisions made in
        reliance on GeoTIFF positional accuracy.
      </Section>

      <Section title="Changes">
        We may update these terms as the product develops. Material changes will be reflected here
        with an updated date.
      </Section>

      <Section title="Contact">
        {" "}<a href="mailto:nabhya.tech26@gmail.com" className="text-[#1B6B3A] underline">
          nabhya.tech26@gmail.com
        </a>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-[11px] font-bold uppercase tracking-widest mb-2 text-[#1a1a1a]">
        {title}
      </h2>
      <p className="text-[13px] leading-relaxed text-[#3a3a3a]">{children}</p>
    </section>
  );
}
