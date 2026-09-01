export default function Privacy() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-20 font-mono text-[#1a1a1a]">
      <h1 className="text-xl font-bold uppercase tracking-widest mb-8">Privacy Policy</h1>
      <p className="text-[11px] text-[#6f6d66] mb-10">Last updated: August 2026</p>

      <Section title="What we collect">
        When you use the demo or API, we receive the image you upload, the ground-sample-distance
        (GSD) value you provide, and, if supplied, a field-boundary polygon and crop label. If you
        contact us or request an API key, we collect your name, email, and organisation.
      </Section>

      <Section title="How we process images">
        Uploaded images are processed in memory only, for the single request that submitted them.
        We do not store, cache, retain, resell, sublicense, or use uploaded imagery to train or
        fine-tune any model. Once your result is returned, the image is discarded.
      </Section>

      <Section title="What we return">
        Analysis output — near-NDVI maps, canopy masks, zone data, confidence metadata, and,
        where GPS EXIF and GSD are available, a georeferenced GeoTIFF — is returned directly to
        you in the API response and is not retained on our servers afterward.
      </Section>

      <Section title="Cookies and analytics">
        This site does not currently use tracking cookies or third-party analytics scripts.
      </Section>

      <Section title="Third parties and international transfer">
        Our API runs on Google Cloud Platform infrastructure. We do not share your imagery or
        account data with any other third party. Depending on the GCP region serving your
        request, data may be processed outside your country of residence; because we do not
        retain imagery beyond the single request, this transfer is transient and not a storage
        transfer.
      </Section>

      <Section title="Your rights">
        You may request access to, correction of, or deletion of any account information we hold
        (name, email, organisation) by contacting us below. Because imagery itself is not
        retained, there is typically nothing to delete on that front beyond account records.
        We will respond to a rights request within a reasonable time, generally within 30 days.
      </Section>

      <Section title="Pilot and enterprise data">
        Free-tier and demo use is covered by this policy. Any pilot or paid integration involving
        real farm imagery is covered under a separate, mutually signed Data Processing Agreement
        (DPA), available on request.
      </Section>

      <Section title="Changes to this policy">
        We may update this policy as the product develops. Material changes will be reflected
        here with an updated date, and, for existing API-key holders, communicated by email.
      </Section>

      <Section title="Contact">
        Questions about this policy, a rights request, or a DPA request:{" "}
        <a href="mailto:nabhya.tech26@gmail.com" className="text-[#1B6B3A] underline">
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
