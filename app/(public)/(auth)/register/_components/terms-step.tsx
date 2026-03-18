"use client";

import { cn } from "@/lib/utils";
import { IconChevronDown } from "@tabler/icons-react";
import { useCallback, useRef, useState } from "react";

type TermsStepProps = {
  onValidChange: (valid: boolean) => void;
};

function TermsStep({ onValidChange }: TermsStepProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Allow a small tolerance (5px) for scroll rounding
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
    if (atBottom && !hasScrolledToEnd) {
      setHasScrolledToEnd(true);
      onValidChange(true);
    }
  }, [hasScrolledToEnd, onValidChange]);

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="h-52 overflow-y-auto rounded-lg border border-gray-700 bg-gray-800/50 p-4 text-sm leading-relaxed text-gray-300 scrollbar-thin"
      >
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-100">
          Terms of Service
        </h3>
        <p className="mb-3 text-xs text-gray-400">
          Last updated: 1 October 2024
        </p>

        {/* ARTICLE 1 */}
        <h4 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-gray-100">
          Article 1 — Introduction, Organization Information, and Customer
          Support
        </h4>

        <h5 className="mb-1.5 text-xs font-semibold text-gray-200">
          Section I. Introduction
        </h5>
        <p className="mb-3">
          This Terms of Service (hereinafter referred to as the
          &ldquo;TOS&rdquo;, &ldquo;Terms&rdquo;, &ldquo;Agreement&rdquo;) is a
          legally binding agreement between QuickSilver Games, its subsidiaries,
          and/or affiliates (hereinafter referred to as
          &ldquo;QuickSilver&rdquo;, &ldquo;Organization&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) and you
          (commonly referred as &ldquo;your&rdquo;, &ldquo;they&rdquo;,
          &ldquo;player(s)&rdquo;, or &ldquo;user(s)&rdquo;). This Agreement
          sets forth the rights, duties, and obligations under which, it grants
          you access to utilize and enjoy our games, any game-specific websites,
          social media, application, customer support, in-game products and/or
          virtual items, and any additional services (hereinafter referred to as
          the &ldquo;QS Services&rdquo;) provided by QuickSilver.
        </p>
        <p className="mb-3">
          Upon accessing, registering, and utilizing our QS Services, you
          explicitly acknowledge your consent to our TOS, Operational Policy,
          and any supplementary terms governing other QS Services. It is your
          responsibility to remain informed of any revisions to these documents.
          In agreeing to these Terms:
        </p>
        <ul className="mb-3 ml-4 list-disc space-y-1">
          <li>
            You also acknowledge that you are using the QS Services at your own
            risk and that our liability to you is subject to the limitations
            outlined in Article 7, Section 3 below; and
          </li>
          <li>
            You expressly acknowledge and affirm that its provisions bind you.
            By accessing or using QS Services, you affirm that you have
            reviewed, comprehended, and accepted the rights, responsibilities,
            provisions, and conditions outlined within this Agreement, and you
            hereby consent to be legally bound by its terms.
          </li>
        </ul>
        <p className="mb-3">
          Your engagement with the Organization signifies your agreement to
          adhere to these TOS. Failure to comprehend or consent to these TOS, or
          inability to adhere to them, prohibits your access to QS Services.
          Continued usage of QS Services confirms your acceptance of these TOS,
          which may undergo periodic revisions. We, at this moment, assert the
          reserved right to amend, modify, or replace any provision within these
          Terms at our discretion. Moreover, upon confirmation, you certify that
          you are of legal age and possess the necessary legal capacity to
          engage in contractual agreements under the laws of your jurisdiction
          and the country from which you access our QS Services.
        </p>
        <p className="mb-3">
          If you do not agree to any term of this Agreement, please refrain from
          using or accessing QS Services, either directly or indirectly, in any
          way.
        </p>

        <h5 className="mb-1.5 text-xs font-semibold text-gray-200">
          Section II. Organization Information
        </h5>
        <p className="mb-3">
          The name of the Organization shall be QuickSilver Games with the
          business address at Golden Grain Villas, Mojon, Malolos, Bulacan, and
          the official website at https://ranonlinegs.com/.
        </p>

        <h5 className="mb-1.5 text-xs font-semibold text-gray-200">
          Section III. Customer Support
        </h5>
        <p className="mb-3">
          The Organization provides official customer support through Discord
          (referred to as &ldquo;Customer Support&rdquo;). Our Customer Support
          will consist of a hundred percent (100%) manual or live support,
          manned by designated moderators, game masters, and administrators
          (referred to as &ldquo;Customer Support Team&rdquo;). The Customer
          Support Team will ensure all Users&apos; concerns, queries,
          complaints, and/or suggestions are promptly addressed and resolved,
          and will prioritize providing personalized assistance to ensure the
          satisfaction of all Users. By engaging with our Customer Support
          Team&apos;s services, you hereby acknowledge and agree that:
        </p>
        <ul className="mb-3 ml-4 list-disc space-y-1">
          <li>Not all feedback may lead to immediate changes;</li>
          <li>
            Time required for resolution shall be contingent upon the existing
            demand from individuals seeking assistance; and
          </li>
          <li>
            The expression of feedback, concerns, queries, complaints, and/or
            suggestions using derogatory language, or in a manner detrimental to
            the Organization, is strictly prohibited.
          </li>
        </ul>

        {/* ARTICLE 2 */}
        <h4 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-gray-100">
          Article 2 — Publication and Amendments
        </h4>

        <h5 className="mb-1.5 text-xs font-semibold text-gray-200">
          Section I. Publication
        </h5>
        <p className="mb-3">
          The Terms of Service are duly published on the official website of the
          Organization, accessible via https://ranonlinegs.com/. This effort
          ensures access for all players to the comprehensive provisions
          outlined within the TOS. Aligned with the Organizational ethos of
          transparency, trust, and mutual understanding among its player base,
          the TOS is accurately written in clear and concise language to
          facilitate comprehension by individuals of varying backgrounds and
          capacities.
        </p>
        <p className="mb-3">
          For users who have been utilizing QS Services prior to the formulation
          of the TOS, it is incumbent upon them to exercise due diligence by
          checking the TOS on the official website. The continued use of QS
          Services implies their explicit agreement to the outlined Terms.
        </p>

        {/* ARTICLE 3 */}
        <h4 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-gray-100">
          Article 3 — Ruling Rules and Operational Policy
        </h4>

        <h5 className="mb-1.5 text-xs font-semibold text-gray-200">
          Section I. Ruling Rules
        </h5>
        <p className="mb-3">
          In the event of any matters not explicitly addressed within these TOS,
          or in the interpretation thereof, such matters shall be governed by
          applicable laws and regulations.
        </p>

        <h5 className="mb-1.5 text-xs font-semibold text-gray-200">
          Section II. Operational Policy
        </h5>
        <p className="mb-3">
          To establish the necessary guidelines for the adoption of the TOS,
          protection of Players&apos; rights and interests, and maintenance of
          order in the game world, the Organization retains the authority to
          institute the Operating Policy as outlined within the specified
          parameters of the TOS. The Organization is required to transparently
          inform Users of the specifics of the Operating Policy by publishing it
          on the official platforms such as the website and Discord server.
        </p>
        <p className="mb-3">
          In the event of a significant revision to the Operating Policy that
          may substantially impact the rights and/or obligations of the Players
          or the Terms of Service, the procedure outlined in Article 2 shall
          govern. However, if the revision pertains to any of the following, it
          shall be notified in advance via the official website and/or official
          Discord:
        </p>
        <ul className="mb-3 ml-4 list-disc space-y-1">
          <li>
            Amendments to provisions explicitly outlined within the purview of
            the Terms of Service;
          </li>
          <li>
            Amendments to provisions unrelated to the rights and obligations of
            players; and
          </li>
          <li>
            Changes to the content of the Operating Policy that do not deviate
            significantly from those articulated in the Terms of Service and are
            foreseeable by players.
          </li>
        </ul>

        {/* ARTICLE 4 */}
        <h4 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-gray-100">
          Article 4 — Method of Use, Registration, Limitations, Use of Account
          by Minors, and Termination
        </h4>

        <h5 className="mb-1.5 text-xs font-semibold text-gray-200">
          Section I. Method of Use
        </h5>
        <p className="mb-3">
          To access and utilize the QS services offered by the Organization, the
          Users must agree and consent to the Terms of Service.
        </p>

        <h5 className="mb-1.5 text-xs font-semibold text-gray-200">
          Section II. Registration
        </h5>
        <p className="mb-3">
          You are required to register or create an account to use the QS
          service. You bear exclusive responsibility for all activities
          conducted through your account and for adherence to these Terms,
          encompassing, without limitation, all transactions made using the
          established account. You are prohibited from establishing or utilizing
          an account, or utilizing any QS Services, on behalf of any other
          individual or legal entity for commercial purposes.
        </p>
        <p className="mb-2">
          By creating an account with us, you must adhere and approve to the
          following conditions:
        </p>
        <ul className="mb-3 ml-4 list-disc space-y-1">
          <li>
            The Login Credentials should be a unique combination selected at the
            player&apos;s convenience. It should contain letters, numbers, and
            special characters;
          </li>
          <li>
            You must be of legal age or have valid and legal guardian consent to
            be bound by these Agreements;
          </li>
          <li>
            You must provide a valid or up-to-date email address for your
            account(s) and other needed information whenever prompted;
          </li>
          <li>
            You are prohibited from sharing your account or login credentials
            with anyone. Users are responsible for all actions performed using
            or accessing the QS Services through their accounts;
          </li>
          <li>
            You must keep your login credentials secure and confidential,
            including but not limited to email addresses, passwords, or other
            related account information;
          </li>
          <li>
            You are not entitled to claim compensation from QuickSilver. In the
            event of a scam, theft, hack, unauthorized use, or any other
            security breach related to your account, it is your responsibility
            to promptly notify us;
          </li>
          <li>
            We may terminate your account at any time for any reason without any
            further formality if we have reason to believe that you have failed
            to comply with this Agreement.
          </li>
        </ul>

        <h5 className="mb-1.5 text-xs font-semibold text-gray-200">
          Section III. Limitation for Registration
        </h5>
        <p className="mb-2">
          QuickSilver reserves the right to refuse acceptance and/or cancel a
          registration if it falls under any of the following conditions:
        </p>
        <ul className="mb-3 ml-4 list-disc space-y-1">
          <li>A User fails to accept or violates this Agreement;</li>
          <li>A minor registers without guardian consent;</li>
          <li>
            If a User provides false, stolen, inaccurate, or incomplete
            information during registration;
          </li>
          <li>
            If a User is found to have provided false or stolen information
            regarding their payment method;
          </li>
          <li>
            The Organization is not capable of approving registration due to
            technical reasons; and
          </li>
          <li>
            If a User has a history of hacking, scamming, or has been banned
            from any of the QS Services or game.
          </li>
        </ul>

        <h5 className="mb-1.5 text-xs font-semibold text-gray-200">
          Section IV. Use of Account by Minors
        </h5>
        <p className="mb-3">
          Users may create or utilize an account or access QS Services only if
          over the age of sixteen (16) or legal age in your country of
          residence. All under the age of sixteen (16) will be ineligible to
          enter into this Agreement, even with parental or legal guardian
          consent. For Users aged 16 or older but under eighteen (18) (referred
          to as a &ldquo;Minor&rdquo;), they must jointly review and accept this
          Term with their parental or legal guardian. QuickSilver disclaims
          liability for any consequences resulting from a Minor&apos;s
          registration without legal guardian consent.
        </p>

        <h5 className="mb-1.5 text-xs font-semibold text-gray-200">
          Section V. Termination of Account
        </h5>
        <p className="mb-3">
          Users have the prerogative to deactivate their account at any given
          time by initiating contact via the official customer support group.
          QuickSilver retains the authority to terminate or suspend an account
          under the following circumstances:
        </p>
        <ul className="mb-3 ml-4 list-disc space-y-1">
          <li>
            If User has contravened or breached any provision of this Agreement;
          </li>
          <li>
            If User has violated any specific Code of Conduct outlined in
            Article 7 Section 1;
          </li>
          <li>
            If it is determined that terminating the account would be in the
            best interest of the QS Community; and
          </li>
          <li>
            The account represents a source of misconduct that has the potential
            to detrimentally impact both the Community and the Organization.
          </li>
        </ul>
        <p className="mb-3">
          In the event that QuickSilver terminates the user&apos;s account,
          access to the registered account and/or utilization of QS Services,
          including but not limited to any in-game products and/or virtual items
          purchased in connection with the Terminated Account, shall be
          forfeited without entitlement to any refund.
        </p>

        {/* ARTICLE 5 */}
        <h4 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-gray-100">
          Article 5 — Protection and Management of Personal Information and
          Collection of Information
        </h4>

        <h5 className="mb-1.5 text-xs font-semibold text-gray-200">
          Section I. Protection and Management of Personal Information
        </h5>
        <p className="mb-3">
          At QuickSilver, we take data privacy seriously. All information
          gathered from all Users is handled in accordance with relevant laws,
          regulations, and our Privacy Policy. The Organization is committed to
          safeguarding your personal and confidential data with legal
          boundaries. Users have the right to request alterations or removal of
          personal information after our review process. The organization shall
          not be held liable for any inadvertent disclosure of personal
          information resulting from user negligence.
        </p>

        <h5 className="mb-1.5 text-xs font-semibold text-gray-200">
          Section II. Collection of Information
        </h5>
        <p className="mb-2">
          The Organization maintains and stores all communication within the
          game world, official website, and official support group server. The
          Organization reserves the right to access and review this information
          under specific circumstances:
        </p>
        <ul className="mb-3 ml-4 list-disc space-y-1">
          <li>For complaint processing and resolution;</li>
          <li>Access for maintaining game order or maintenance;</li>
          <li>Dispute resolution among Players;</li>
          <li>Account security investigations;</li>
          <li>Financial-related transactions;</li>
          <li>
            Handling violations such as derogatory language, fraud, or bug
            abuse; and
          </li>
          <li>
            Utilizing information of in-game settings or developmental processes
            to improve the quality and stabilization of the QS Service.
          </li>
        </ul>
        <p className="mb-3">
          All users are hereby reminded that the QuickSilver team will never
          solicit your password. Users are expressly advised against disclosing
          their passwords, secret answers, or billing information to any party.
        </p>

        {/* ARTICLE 6 */}
        <h4 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-gray-100">
          Article 6 — RCoins Acquisition and Usage Policy
        </h4>

        <h5 className="mb-1.5 text-xs font-semibold text-gray-200">
          Section I. RCoins Acquisition and Usage Policy
        </h5>
        <p className="mb-3">
          As part of the services provided by the Organization, players may
          purchase and utilize RCoins as an in-game currency (referred to as
          &ldquo;Game Currency&rdquo;). Game Currency may exclusively be
          acquired through the official website of the Organization. Accepted
          payment methods include: GCash, Online bank payments, and PayPal.
        </p>
        <p className="mb-3">
          Game Currency serves as the designated currency for transactions
          within the Organization&apos;s game and associated paid content.
          Players may utilize Game Currency for various in-game purchases,
          including but not limited to virtual items, enhancements, and premium
          features.
        </p>

        <h5 className="mb-1.5 text-xs font-semibold text-gray-200">
          Section II. Withdrawing Paid Contents and RCoins
        </h5>
        <p className="mb-3">
          The acquisition of RCoins and subsequent in-game purchases, virtual
          items, enhancements, and/or premium features, is deemed nonrefundable
          once Users have received the RCoins and/or associated items. Should
          Users initiate a charge back or request a refund, the Organization
          reserves the right to impose a permanent ban on the User&apos;s
          account.
        </p>

        <h5 className="mb-1.5 text-xs font-semibold text-gray-200">
          Section III. Disclaimer of Warranties
        </h5>
        <p className="mb-3">
          The User acknowledges that the Organization provides QS Services,
          including third-party services and in-game products, and the
          User&apos;s utilization of these services is entirely at their own
          risk. These services are provided without any express or implied
          warranties, including warranties of merchantability or fitness for a
          particular purpose.
        </p>

        <h5 className="mb-1.5 text-xs font-semibold text-gray-200">
          Section IV. Purchasing, Requesting and Withdrawing Paid
          Contents/RCoins
        </h5>
        <p className="mb-3">
          To the maximum extent permitted by applicable law, the Organization
          explicitly disclaims, and you hereby waive, all warranties and
          liabilities, whether express or implied, arising by operation of law
          or otherwise, concerning all QS Services and its contents. The
          Organization does not ensure or guarantee uninterrupted accessibility
          to the Organization website or in-game item shop, nor does it assert
          that this site, its materials, or the server facilitating its
          availability are free from errors, defects, design flaws, omissions,
          viruses, or other harmful components.
        </p>

        {/* ARTICLE 7 */}
        <h4 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-gray-100">
          Article 7 — Code of Conduct, Obligations, Liability, and Compensation
        </h4>

        <h5 className="mb-1.5 text-xs font-semibold text-gray-200">
          Section I. Code of Conduct
        </h5>
        <p className="mb-2">
          Users are obligated to abide by all relevant laws and regulations
          within their jurisdiction and are expected to adhere to our Code of
          Conduct. The following instances constitute behavior that may warrant
          disciplinary action:
        </p>
        <ul className="mb-3 ml-4 list-disc space-y-1">
          <li>
            Disclosing, soliciting, or attempting to obtain confidential or
            personal information from another user;
          </li>
          <li>
            Subjecting other players or QuickSilver team members to conditions
            that render them feeling unsafe, abused, or disrespected;
          </li>
          <li>
            Behavior that diminishes, threatens, bullies, insults, abuses, or
            harasses others, including actions that endorse hateful ideologies,
            discrimination, or violence;
          </li>
          <li>
            Harassment, doxing, threats, abuse, libel, slander, or other
            disruptive behavior;
          </li>
          <li>
            Impersonating individuals, other players, or QuickSilver team
            members, disseminating false information, or engaging in spam;
          </li>
          <li>
            Exploiting bugs, distributing unauthorized plugins, or using cheats,
            bots, hacks, or transmitting harmful content;
          </li>
          <li>
            Posting or sharing content that encourages illegal, obscene, or
            otherwise disruptive behavior;
          </li>
          <li>Providing unauthorized payment methods;</li>
          <li>
            Engaging in cheating, scamming, stealing, or selling unauthorized
            in-game items;
          </li>
          <li>
            Inducing or encouraging others to violate the TOS, or engaging in
            any illegal or fraudulent activity;
          </li>
          <li>
            Disrupting in-game chat by using vulgar language, spamming,
            flooding, or posting repetitive text; and
          </li>
          <li>
            Improperly using the official support group server to make false
            reports.
          </li>
        </ul>

        <p className="mb-2">
          Sanctions for violations will be determined based on severity:
        </p>
        <p className="mb-1 text-xs font-semibold text-gray-200">
          Cheating in Farming Activities:
        </p>
        <ul className="mb-2 ml-4 list-disc space-y-1">
          <li>First Violation: 15-day HOJ confinement and temporary ban</li>
          <li>Second Violation: 30-day HOJ confinement and temporary ban</li>
          <li>Third Violation: 60-day HOJ confinement and temporary ban</li>
          <li>Fourth Violation: Permanent ban</li>
        </ul>
        <p className="mb-1 text-xs font-semibold text-gray-200">
          Cheating in Tyranny Wars, Club War, Dungeon, or PvP:
        </p>
        <ul className="mb-3 ml-4 list-disc space-y-1">
          <li>First Violation: 30-day HOJ confinement and temporary ban</li>
          <li>Second Violation: 60-day HOJ confinement and temporary ban</li>
          <li>Third Violation: 90-day HOJ confinement and temporary ban</li>
          <li>Fourth Violation: Permanent ban</li>
        </ul>

        <h5 className="mb-1.5 text-xs font-semibold text-gray-200">
          Section II. Obligations of the Organization
        </h5>
        <ul className="mb-3 ml-4 list-disc space-y-1">
          <li>
            Uphold and maintain an effective security system to safeguard
            personal and confidential information;
          </li>
          <li>
            Promptly address equipment damage or data loss during service
            improvements, except in cases of force majeure;
          </li>
          <li>
            Manage customer support services and provide courteous, efficient
            assistance; and
          </li>
          <li>
            Endeavor to provide convenience to users and continuously enhance
            services.
          </li>
        </ul>

        <h5 className="mb-1.5 text-xs font-semibold text-gray-200">
          Section III. Limitations of Organization Liability
        </h5>
        <p className="mb-2">
          Users acknowledge that their use of QS Services is at their own risk.
          The Organization provides the game(s) and QS Services on an &ldquo;as
          is&rdquo; and &ldquo;as available&rdquo; basis. QuickSilver shall be
          exempted from responsibility if:
        </p>
        <ul className="mb-3 ml-4 list-disc space-y-1">
          <li>
            QS Services are interrupted due to national emergencies, natural
            disasters, accidents, or technically intricate issues;
          </li>
          <li>
            Loss of access arises from the fault or negligence of the User;
          </li>
          <li>
            Users encounter problems arising from mismanagement of personal
            data;
          </li>
          <li>Users do not get the expected results when using QS Services;</li>
          <li>Loss of game data due to user negligence;</li>
          <li>
            Disputes arise between users or between a user and a third party;
          </li>
          <li>
            Complimentary in-game items are lost due to player negligence or
            technical issues; and
          </li>
          <li>
            Users have deleted content or account information and subsequently
            seek retrieval.
          </li>
        </ul>

        <h5 className="mb-1.5 text-xs font-semibold text-gray-200">
          Section IV. Obligations of Players
        </h5>
        <ul className="mb-3 ml-4 list-disc space-y-1">
          <li>
            Review and adhere to the provisions outlined in these Terms and
            notices posted on official platforms;
          </li>
          <li>
            Abide by all provisions outlined in these terms and conditions;
          </li>
          <li>
            Inform the Organization of any server issues, errors, bugs, or
            system problems;
          </li>
          <li>
            Adhere to guidelines in the Separate Operational Policy while
            playing;
          </li>
          <li>Do not obtain game data through unauthorized methods; and</li>
          <li>
            Maintain the security of accounts, including safeguarding passwords
            and utilizing a valid email address.
          </li>
        </ul>

        <h5 className="mb-1.5 text-xs font-semibold text-gray-200">
          Section V. Compensation for Damage
        </h5>
        <p className="mb-3">
          If Users fail to comply with all the agreements outlined in this TOS,
          and they cause significant damage to the Organization, QuickSilver may
          seek injunctive relief from the court or any payment, depending on the
          violation committed. The player&apos;s family name, character name,
          etc., may be posted on the official website and other online platforms
          of the Organization.
        </p>

        <h5 className="mb-1.5 text-xs font-semibold text-gray-200">
          Section VI. Notice to Users
        </h5>
        <p className="mb-3">
          In the event of any dispute arising between you and a third party,
          resolution shall be sought solely between you and the aforementioned
          third party. The Organization explicitly disclaims any liability for
          obligations incurred by you to said third party concerning your use of
          the QS Services. You expressly agree to indemnify, defend, and hold
          harmless the Organization, its affiliates, moderators, game masters,
          developers, and administrators from all claims, liabilities, losses,
          and expenses, including reasonable attorneys&apos; fees, arising from
          such disputes with third parties.
        </p>

        {/* ADDENDUM */}
        <h4 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-gray-100">
          Addendum
        </h4>
        <p>This Agreement will be effective as of 1 March 2024.</p>
      </div>

      {/* Scroll prompt */}
      <div
        className={cn(
          "flex items-center justify-center gap-1.5 text-xs transition-opacity",
          hasScrolledToEnd
            ? "text-accent opacity-100"
            : "text-gray-500 opacity-100",
        )}
      >
        {hasScrolledToEnd ? (
          "You have read the terms & conditions"
        ) : (
          <>
            <IconChevronDown className="size-3.5 animate-bounce" />
            Scroll to the end to continue
          </>
        )}
      </div>
    </div>
  );
}

export { TermsStep };
