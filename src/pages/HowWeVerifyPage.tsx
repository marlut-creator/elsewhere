import InfoPageLayout from "../components/InfoPageLayout";

export default function HowWeVerifyPage() {
  return (
    <InfoPageLayout page="impact" title="How we verify claims">
      <p>
        Every product in our catalog links to a seller-published source for its
        giving claim — mission pages, impact reports, or program descriptions.
      </p>
      <p>
        We check that the claim is specific enough to describe (for example,
        percent of profits, item donations, or purchase-linked programs) and
        note when math is too vague to estimate dollar impact from a retail
        price.
      </p>
      <p>
        Cards link to &ldquo;How we verified this&rdquo; sources. Claims can
        go stale; dates on catalog entries reflect when we last reviewed price
        and giving language.
      </p>
      <p>
        We do not verify your individual purchases. My Elsewhere is
        self-reported until receipt or seller confirmation exists in a future
        version.
      </p>
    </InfoPageLayout>
  );
}
