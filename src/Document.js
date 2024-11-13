import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import ReactDOMServer from "react-dom/server";
import soil from "./soil.jfif";
import art from "./art.jpg";

const DocumentViewer = () => {
  const navigate = useNavigate();
  const [documentContent, setDocumentContent] = useState("");
  const [activeButton, setActiveButton] = useState(2);

  //doc1
  const doc1HTML = ReactDOMServer.renderToString(
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-10">
          <h6 className="text-center fw-bolder fs-4 mb-2">
            Farmer Decision Tool for Soil Health and Productivity
          </h6>
          <p className="me-2 mt-3">
            <b className="me-2">Learning Outcomes</b> <br />
            At the end of this course, participants should be able to:
          </p>
          <ol>
            <li>Understand what is soil health</li>
            <li>
              Identify soils which are healthy and soils which are not healthy
            </li>
            <li> Know the benefits of having healthy soils</li>
            <li> Identify various ways to improve soil health</li>
            <li>
              Create an action plan for improving soil health and productivity
            </li>
          </ol>

          <div>
            <p>
              <b className="">Pre-Requisites : </b>
              <br />
              In order to benefit fully from this class, participants should
              have already attended the following classes:
            </p>
          </div>
          <div>
            <ol>
              <li>No pre-requisite is needed</li>
            </ol>
          </div>

          <div className="col-md-12">
            <p className="mb-0">
              <b className="me-1">Timing of this Lesson:</b> This lesson can
              take place late in the growing season so participants can still
              compare crop growth and prepare for crop residue management.
              Alternatively, it can be scheduled 2-3 months before the start of
              the rainy season as they develop their upcoming cropping plans.
            </p>
          </div>

          <div className="col-md-12">
            <b>References :</b>
            <p>
              <a
                className="highlight"
                href="https://www.nrcs.usda.gov/conservation-basics/natural-resource-concerns/soils/soil-health/soil-health-assessment"
              >
                Soil Health Assessment
              </a>
              . Natural Resources Conservation Service, United States Department
              of Agriculture.
            </p>
          </div>

          <div className="col-md-12">
            <b>Materials Needed :</b>
            <ol>
              <li>
                A field with good soil health nearby a field with poor soil
                health
              </li>
              <li> 1 hoe or shovel</li>
              <li> 2 containers to collect soil</li>
              <li> Soil health poster</li>
              <li> Flip chart and marker pens</li>
              <li> Seeds (at least 10 per participant)</li>
            </ol>
          </div>
          <b>Preparation</b>
          <div className="col-md-12">
            <ol>
              <li>
                Sample the 2 soils ahead of time to assure that there are
                visible differences between them.
              </li>
              <li>
                Use the Decision Support Tool App to identify several
                high-potential sustainable intensification technologies suitable
                for this specific area.
              </li>
              <li>
                Review all discussion questions and be prepared to guide the
                discussion appropriately.
              </li>
            </ol>
          </div>

          <div className="col-md-12">
            <p>
              <b>Learning Activities</b> (Total time required: 2-3 hours)
            </p>
          </div>
          <div className="row">
            <b>I. Introduction </b>
            <div className="col-md-8 px-4">
              <p>
                <b>A. Opening Discussion -</b> write their responses on the flip
                chart (15 minutes)
              </p>
              <ol>
                <li>
                  Ask the group to explain how they know when a soil is healthy
                  or fertile. What are the signs that they look for?
                  (Alternative question: If you are looking for a piece of land
                  for farming, what characteristics can tell you that a certain
                  piece of land is good for farming?)
                </li>
                <li>
                  Present the soil health poster and ask them which of the maize
                  leaves looks like it was growing in a healthy soil.
                </li>
                <li>
                  Ask if they have a word in their local language that is used
                  to describe a healthy soil?
                </li>
                <li className="list-group-item">
                  Why is it important for our soils to be healthy?
                  <b>
                    {" "}
                    Allow them to give their answers first, but be sure that
                    they discuss higher productivity, lower input costs, easier
                    soil preparation, and greater drought tolerance.
                  </b>
                </li>
              </ol>
            </div>

            <div className="col-md-4">
              <img
                src={soil}
                alt="Description of image"
                height="md-full"
                width="300"
              />
            </div>
          </div>
          <p>
            <b>II. Practical Training </b> (60 minutes)
          </p>

          <div className="px-2">
            <p>
              <b className="px-2">
                A. Take the group to a field where regenerative agriculture has
                been practiced
              </b>{" "}
              (e.g. Conservation Agriculture, double-up legumes, cover crops,
              etc.)
            </p>
            <b className="px-4">
              1. Dig 4-5 liters of topsoil and place them in the bucket
            </b>
            <p>
              <b className="px-2">
                B. Take the group to a field where extractive agriculture has
                been practiced
              </b>{" "}
              (e.g. continuous maize, crop residue burning, etc.)
            </p>
            <b className="px-4">
              1. Dig 4-5 liters of topsoil and place them in the bucket
            </b>
            <b>
              C. Allow each farmer to take a handful of each soil and examine
              them for several minutes
            </b>
            <br />
            <div className="px-2">
              <p>
                (if the sun is hot, take the buckets to a shady spot before
                distributing samples and holding the following discussion)
              </p>
              <b>
                <i>
                  1. What differences have you seen between these two soils?
                  Allow them to give their answers first, but be sure that they
                  discuss the following:
                </i>
              </b>
              <p>
                a) The soil from the regenerative field is darker (have them
                compare the 2 colors to the Munsell Soil Color Chart on the
                poster).
                <br />
                b) The soil from the regenerative field is softer and more
                crumbly
                <br />
                c) The soil from the regenerative field has more roots growing
                in it
              </p>
              <b>2. Which field has healthier-looking crops?</b>
              <i>
                If the field has already been harvested ask them if they
                remember which field was more productive during the previous
                season.
              </i>
              <br />
              <b>
                3. Which field would you rather farm in the next season? Why?
              </b>
            </div>
          </div>

          <p className="mt-2">
            <b>III. Follow-up Discussion (45 minutes)</b> Return to a
            comfortable meeting place for this discussion
          </p>

          <div className="px-2">
            <b>A. Discussion Questions:</b>
            <p>
              1. In your community, which soils tend to be healthier: Soils
              nearby the homestead where people are living, or soils which are
              far away from the homestead? Why?
            </p>
            <p>
              2. What is the "food" which makes soils healthy?{" "}
              <i>
                Allow them to give their responses, but if they struggle, help
                them see that it is the organic inputs like crop residues,
                manure, cover crops, etc. which truly "feed" soils.
              </i>
            </p>
            <p>
              The regenerative agriculture approach that we saw in the field
              showed us one way to improve soil health. What are some other ways
              we can improve soil health?
            </p>
          </div>

          <div className="col-md-10">
            <b>B. Action Planning</b>
            <div className="px-2">
              <p>
                1. Review all the methods they have listed for improving soil
                health which you have written on the flip chart
              </p>
              <p>
                2. Supplement their list by writing down and explaining any
                other high-potential methods which you have identified for this
                community
              </p>
              <p>
                3. Ask them which of these methods they think will be most
                effective and most practical on their farms?
              </p>
              <p>
                4. Use the 10-seed method (see Appendix A) to identify the top
                2-3 methods which they will try in the coming season.
              </p>
              <p>
                5. Offer to return to help them learn how to implement their
                priority methods and prepare a schedule for follow-up training.
              </p>
              <p>6. Ask them if they have any unanswered questions.</p>
              <p>
                7. Thank them for their wisdom and insights throughout the
                lesson!
              </p>
            </div>
          </div>

          <p>
            <strong>Appendix A: Ten-Seeds Method</strong>
          </p>

          <p>
            This method is used to help non-literate groups set priorities in a
            participatory manner. It can be used to select different crop
            varieties, different activities for the group to undertake, or even
            group leadership.
          </p>

          <ol>
            <li>
              List the different options for which people will be voting. This
              may be done using pictures on pieces of paper. Discuss thoroughly
              what each option is to be sure that people know what they are
              voting for.
            </li>
            <li>
              Place the papers on a table, or on the floor where all can see
              them.{" "}
            </li>
            <li>
              Give every participant 10 seeds (or stones, or any other small
              objects). If you want to separate the answers of different groups
              (e.g. men and women) give a different kind of seed to each group.
            </li>
            <li>
              Explain that each individual will use their seeds to indicate
              which option they prefer. They may put all their seeds on one
              paper, to indicate that the highly prefer this option, or they may
              distribute their seeds between several options which they like.
            </li>
            <li>
              Allow everyone to place their seeds on the paper indicating the
              options they prefer.
            </li>
            <li>
              Count the seeds on each paper to determine the group priority
            </li>
            <li>
              Ask Participants to discuss why they voted for the different
              options.{" "}
            </li>
            <li>
              If, during the discussion, people's opinions are changed by the
              arguments of other group members, a second vote may be taken to
              finalize the decision.
            </li>
          </ol>

          <h5>
            <strong>Appendix B: Crop Options Matrix Exercise</strong> (adapted
            from the{" "}
            <a href="https://research.reading.ac.uk/picsa/wp-content/uploads/sites/76/Manuals-Resources/PICSA-Manual-English.pdf">
              PICSA Field Manual
            </a>
            )
          </h5>

          <div className="col-md-4">
            <div className="img">
              <img
                src={art}
                alt="Description of image"
                height="300"
                width="300"
              />
            </div>
          </div>

          <ol className="mt-2">
            <li>Draw the outline of a SI Practices Matrix on a flipchart.</li>
            <li>
              In the left column, list all the practices brainstormed by the
              farmers, as well as the practices identified by the SI for Soil
              Health app.
            </li>
            <li>
              Explain each of the headings at the top of the matrix:
              <ol type="a">
                <li>
                  Who does the practice: Ask farmers to identify whether the
                  labour demand for the practice will be high moderate or low
                  for women and also for men.
                </li>
                <li>
                  Benefits and who benefits: Use this column to list how
                  significantly each of the practices is likely to benefit them
                  (e.g. food, cash income, fuel wood, etc.) Then ask farmers to
                  indicate who is likely to benefit most from the practice -
                  men, women or both.{" "}
                </li>
                <li>
                  Performance in 'Low', 'Medium' and 'High' rainfall seasons /
                  years: Use this column to consider how each of the crop
                  practices will perform in rainfall scenarios.
                </li>
                <li>
                  Investment: Use this column to consider the level of
                  investment required for each practice. Is it high (H),
                  moderate (M) or low (L).
                </li>
                <li>
                  Time to benefit: Use this column to estimate how long it will
                  take before they start to benefit from each practice. Make
                  sure you take into account whether farmers would need extra
                  time to learn new skills or acquire materials.
                </li>
                <li>
                  Risks or disadvantages: Use this column to highlight any other
                  risks involved with the practices (e.g. less crop residue for
                  livestock feed if it is used for mulching).
                </li>
              </ol>
            </li>
            <li>
              Go through the crop practices one by one, asking the farmers about
              each of the headings and agreeing on what should be filled in. It
              is important that the decisions are made by the group and not by
              you, the facilitator.
            </li>
            <li>
              Ask the farmers to identify which practices are likely to be
              helpful in most seasons (whether they are low, medium or high
              rainfall seasons) or that will still give a reasonable yield in
              poor seasons. Mark these with a circle.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );

  //doc2
  const doc2HTML = ReactDOMServer.renderToString(
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-10">
          <p className="d-flex flex-column align-items-end">
            <strong>Neil R. Miller</strong>
            <strong>13 July, 2024</strong>
          </p>
          <p className="text-center">
            <strong>
              Toward a Farmer-Centric Approach to Training in Malawi
            </strong>
          </p>
          <p>
            <strong>Introduction</strong>
          </p>
          <p>
            Sustainable Intensification (SI) technologies have been increasingly
            promoted for small-holder farmers in Africa in recent years.
            Governments, NGOs, and research institutions, including CIMMYT, have
            recognized the value of SI in protecting the environment and
            increasing productivity leading to greater food security.{" "}
          </p>
          <p>
            Because of the immense diversity of agro-ecological zones and
            cultures present on the African continent, SI technologies need to
            be adapted the local context where they are being promoted.
            Unfortunately, adaptive methodologies for helping extension staff
            and farmers sort through the many possible SI technologies are
            lacking.{" "}
          </p>
          <p>
            To this end, CIMMYT launched the innovative Space to Place (S2P)
            project to enable the promotion of locally appropriate management
            recommendations, guided by a mobile phone application using
            digitized maps and farmer-level characteristics. CIMMYT staff and
            Malawi stakeholders have prepared a list of around 25 potential SI
            technologies and rated their appropriateness to different
            agroecological zones and soil textures. Presumably these
            technologies will also be rated according to their appropriateness
            for different farmer socio-economic characteristics before being
            programmed into a phone app.{" "}
          </p>
          <p>
            One potential risk to developing such an app is that it could be
            used by extension agents as a prescriptive tool. Given the lure of
            technological devices, they may assume that the app itself is
            sufficient to decide which technologies are appropriate for each
            context where they work. The pitfalls to such an approach include:{" "}
          </p>
          <ol>
            <li>
              A database of this sort can't possibly take into account the
              micro-level agroecological and socioeconomic diversity present in
              rural African communities.{" "}
            </li>
            <li>
              The farmers themselves don't participate in deciding which
              technologies they will learn about. As a result, the likelihood
              that they will actually adopt the technologies is much lower than
              if they had chosen what they wanted to learn.
            </li>
            <li>
              Local farmer knowledge and innovation doesn't contribute to the
              process. Inovative farmers in most communities have developed
              effective farming methods that can contribute to the productivity
              and sustainability of their neighbors as well as helping extension
              and research professionals broaden their list of approapriate
              technologies.
            </li>
          </ol>
          <p>
            <strong>
              <em>
                A farmer-centric approach to SI training will build on the
                strength of modern technology, while at the same time
                incorporating the interests and expertise of local farmers
              </em>
            </strong>
            . The phone app, currently under development, will help extension
            agents narrow down the roughtly 25 SI technologies to 3-4 best-bet
            options for each individual context. Then, though a participatory
            process, farmers themselves will add to this list and decide what
            new techniques they want the extension service to help them learn.
          </p>
          <p>
            <strong>A Participatory Decision-Making Tool</strong>
          </p>
          <p>
            Key to the success of a farmer-centric approach is an effective
            decision-making tool that extension agents and lead farmers can use
            to facilitate the process of identifying technologies for training.
            An example of such a tool was developed by Partners of the Canadian
            Foodgrains Bank (CFGB) and shared with CIMMYT staff in June
            (Appendix 1). With some minor adaptation, this tool could be used as
            the first step in engaging a farmer group with the S2P approach.{" "}
          </p>
          <p>
            This tool assumes the extension agent or lead farmer has the
            facilitation skills to lead a non-directive process and is committed
            to using a participary approach. Using it effectively will require
            training of the trainers, many of whom may be more comfortable with
            a more one-way delivery of extension information. Nevertheless,
            without a farmer-participatory process, the appropriateness of the
            selected technologies to each context, and the adoption rate of the
            farmers will be much lower.
          </p>
          <p>
            <strong>Pedigogical Approach: Dialogical vs. Didactic?</strong>
          </p>
          <p>
            Once a farmer-group decides which innovations they want to learn and
            adopt, the extensionist or lead farmer will walk them through a
            learning process. The current Soil Health Manual, designed to train
            farmers on the roughly 25 SI technologies under consideration, uses
            a relatively traditional, didactic approach to training.
            Step-by-step guidance is given on how to implement each technology.
            Questions are presented at the end of each module for the sake of
            repeating information provided earlier in the lesson and assessing
            the comprehension of the learner, but farmers are not asked to
            provide their own ideas or suggestions.
          </p>
          <p>
            Brazilian educator, Paulo Friere called this the 'banking' approach
            to education. Teachers with knowledge 'deposit' what they have into
            the knowledge bank of their students. Friere espoused an alternative
            approach in which a facilitator guides the learning process by
            posing open-ended, generative questions which invite learners to
            discuss and contribute to the learning process. Since 2015, CFGB
            staff and Partners have used this approach in promoting conservation
            agriculture throughout sub-Saharan Africa. A set of core CA training
            modules, and modules usng this approach for many other subjects, are
            available in many languages from the{" "}
            <a href="http://edn.link/farmertraining">ECHO website</a>.
          </p>
          <p>
            Many of these materials could be used directly or adapted to
            facilitate training for SI technologies in the S2P list. However, a
            prior question is whether we want to take a dialogical approach or a
            more traditional, didactic approach to training. A dialogical
            approach is clearly more farmer-centric. It capitalizes on farmer
            knowledge, combined with information from the scientific community,
            to identify solutions and build the commitment of farmers resulting
            in higher adoption rates.{" "}
          </p>
          <p>
            On the other hand, effective implementation of such an approach will
            call for significant training of trainers in order to be effective.
            CFGB has carried out a 'master training' process for NGO and
            government extension staff in Ethiopia, Rwanda, Kenya, Zimbabwe and
            Burundi which combines adult education/facilitation skills with
            technical training. Participants testify that the trainng has
            transformed their extension approach and helped them to engage
            farmers more effectively. In Ethiopia and Rwanda, the national
            extension services were impressed enough with the approach that they
            asked CFGB to train their extension staff throughout their
            countries. A private foundation (Ethiopia) and the World Food
            Program (Rwanda) have provided funding for these initiatives. Is
            there the potential for such an effort in the S2P countries?{" "}
          </p>
          <p>
            An alternative approach could be to incorporate some additional
            adult education principles (i.e. open-ended rather than leading
            questions, role plays, hands-on activities, etc.), but not expect
            extension personnel to gain the level of skills of a Master Trainer.
            This approach will be cheaper and quicker to implement, but likely
            less effective.
          </p>
          <p>
            Presumably the decision on pedigogical approach will be made in
            conversation with our extension partners in Malawi unless such a
            discussion has already taken place. I look forward to your guidance
            on how to proceed.
          </p>
          <p>
            <strong>
              Appendix 1: Soil Health Training/Decision Making Tool
            </strong>
          </p>
          <p>
            <strong>Learning Outcomes </strong>At the end of this course,
            participants should be able to:
          </p>
          <ol>
            <li>Understand what is soil health</li>
            <li>
              Identify soils which are healthy and soils which are not healthy
            </li>
            <li>
              Know the benefits of having healthy soils and the losses from
              unhealthy soil
            </li>
            <li>Know various ways to improve soil health</li>
            <li>Create an action plan for improving soil health</li>
          </ol>
          <p>
            <strong>Pre-Requisites: </strong>In order to benefit fully from this
            class, participants should have already attended the following
            classes:
          </p>
          <ol>
            <li>No pre-requisite is needed</li>
          </ol>
          <p>
            <strong>Timing of this Lesson: </strong>This lesson can take place
            late in the growing season so the participants can still compare
            crop growth and prepare for crop residue management, or it can take
            place 2 months before the beginning of the rainy season as they are
            developing their coming cropping plans.
          </p>
          <p>
            <strong>Timing of this Lesson: </strong>This lesson can take place
            late in the growing season so the participants can still compare
            crop growth and prepare for crop residue management, or it can take
            place 2 months before the beginning of the rainy season as they are
            developing their coming cropping plans.
          </p>
          <p>
            <strong>References:</strong>
          </p>
          <p>
            Resource Concerns &amp; Soil Health Indicators V2.3. Natural
            Resources Conseration Service. United States Department of
            Agriculture
          </p>
          <div className="row">
            <p>
              <img src="hello" className="px-2" /> Centre for Sustainable
              Development.{" "}
              <a href="https://csd-i.org/ten-seed-technique-field-note">
                10 Seed: How-To Card
              </a>
            </p>
          </div>
          <p>
            <strong>Materials Needed : </strong>
          </p>
          <ol>
            <li>
              A field with good soil health nearby a field with poor soil health
            </li>
            <li>hoe or shovel</li>
            <li>containers to collect soil</li>
            <li>Soil health poster </li>
            <li>Flip chart and marker pens</li>
            <li>Seeds (at least 10 per participant)</li>
          </ol>
          <p>
            <strong>Preparation : </strong>
          </p>
          <ol>
            <li>
              Sample the 2 soils ahead of time to assure that there are visible
              differences between them
            </li>
            <li>
              Review all discussion questions and be prepared to guide the
              discussion appropriately.
            </li>
            <li>
              Recruit 3-4 people for the role play. Make sure there is a gender
              balance
            </li>
            <li>
              If you choose to use the Mother Earth drama (see Appendix A)
              recruit 3 actors and prepare the skit with them ahead of time.
            </li>
          </ol>
          <h5>Learning Activities (Total time required = 2-3 hours)</h5>
          <p>
            <strong>I. Introduction</strong> (The Mother Earth drama, in
            Appendix A, can be used here as an attention grabber, or later as an
            energizer)
          </p>
          <p>
            <strong>Opening Discussion : </strong> write their responses on the
            flip chart (15 minutes)
          </p>
          <ol>
            <li>
              Ask the group to explain how they know when a soil is healthy or
              fertile. What are the signs that they look for? (
              <em>Alternative question</em>: If you are looking for a piece of
              land for farming, what characteristics can tell you that a certain
              piece of land is good for farming?)
            </li>
            <li>
              Present the soil health poster and ask them which of the maize
              leaves looks like it was growing in a healthy soil.
            </li>

            <li>
              Ask if they have a word in their local language that is used to
              describe a healthy soil?
            </li>
            <li>
              Why is it important for our soils to be healthy?{" "}
              <strong>
                <em>
                  Allow them to give their answers first, but be sure that they
                  discuss higher productivity, lower input costs, easier soil
                  preparation, and greater drought tolerance.
                </em>
              </strong>
            </li>
          </ol>
          <p>
            <strong>II. Introduction</strong> Practical Training (60 minutes)
          </p>
          <p>
            <strong>
              A. Take the group to a field where regenerative agriculture has
              been practiced
            </strong>{" "}
            (e.g. Conservation Agriculture, double-up legumes, cover crops,
            etc.)
          </p>
          <p>
            <strong className="mx-2">
              1. Dig 4-5 liters of topsoil and place them in the bucket
            </strong>
          </p>
          <p>
            <strong>
              B. Take the group to a field where extractive agriculture has been
              practiced{" "}
            </strong>{" "}
            (e.g. continuous maize, crop residue burning, etc.)
          </p>
          <p className="mx-2">
            <strong>
              1. Dig 4-5 liters of topsoil and place them in the bucket
            </strong>
          </p>
          <p>
            <strong>
              C. Allow each farmer to take a handful of each soil and examine
              them for several minutes
            </strong>{" "}
            (if the sun is hot, take the buckets to a shady spot before
            destributing samples and holding the following discussion:
          </p>
          <p>
            <strong>
              1. What differences have you seen between these two soils? Allow
              them to give their answers first, but be sure that they discuss
              the following:
            </strong>
          </p>
          <ol type="a">
            <li>
              The soil from the regenerative field is darker (have them compare
              the 2 colors to the Munsell Soil Color Chart on the poster).
            </li>
            <li>
              The soil from the regenerative field is softer and more crumbly
            </li>
            <li>
              The soil from the regenerative field has more roots growing in it
            </li>
          </ol>
          <p>
            <strong>2. Which field has healthier-looking crops? </strong>
            If the field has already been harvested ask them if they remember
            which field was more productive
          </p>
          <p>
            <strong>
              3. Which field would you rather farm in the next season? Why?
            </strong>{" "}
          </p>
          <p>
            <strong>Follow-up Discussion (45 minutes)</strong> Return to a
            comfortable meeting place for this discussion
          </p>
          <p>
            <strong>A. Discussion Questions:</strong>
          </p>
          <ol type="1">
            <li>
              In your community, which soils tend to be healthier: Soils nearby
              the homestead where people are living, or soils which are far away
              from the homestead? Why?
            </li>
            <li>
              What is the 'food' which makes soils healthy? Allow them to give
              their responses, but if they struggle, help them see that it is
              the organic inputs like crop residues, manure, cover crops, etc.
              which truly 'feed' soils.
            </li>
            <li>
              The regenerative agriculture approach that we saw in the field
              showed us one way to improve soil health. What are some other ways
              we can improve soil health?{" "}
            </li>
          </ol>
          <p>
            <strong>Action Planning</strong>
          </p>
          <ol type="1">
            <li>
              Review all the methods they have listed for improving soil health
              which you have written on the flip chart
            </li>
            <li>
              Supplement their list by writing down and explaining any other
              high-potential methods which you have identified for this
              community
            </li>
            <li>
              Ask them which of these methods they think will be most effective
              and most practical on their farms?
            </li>
            <li>
              Use the 10-seed method (<strong>see Appendix A</strong>) to
              identify the top 2-3 methods which they will try in the coming
              season.
            </li>
            <li>
              Offer to return to help them learn how to implement their priority
              methods and prepare a schedule for follow-up training.
            </li>
            <li>
              <strong>Ask them if they have any unanswered questions.</strong>
            </li>
            <li>
              Thank them for their wisdom and insights throughout the lessons!
            </li>
          </ol>

          <h3>
            <strong>Appendix A: Mother Earth Role Play (30 minutes)</strong>
          </h3>
          <h5>A. Drama</h5>
          <h5>A mother struggles to feed her 2 greedy children. </h5>
          <ol type="a">
            <li>
              She goes to the garden each day, works hard and brings food home
              to cook for them
            </li>
            <li>
              When she prepares their food, the children eat it all up and there
              is nothing left for her to eat.
            </li>
            <li>
              The children are very demanding and show no appreciation for the
              hard work their mother does on their behalf.
            </li>
          </ol>
          <h3>
            Because she has too little food, the mother becomes weaker and
            weaker.
          </h3>
          <ol>
            <li>After some time she dies of hunger..</li>
            <li>
              The children cry and cry, but not because they love their mother,
              rather because now they have no one to take care of them!
            </li>
          </ol>
          <h4>In despiration, they consider themselves very unlucky.</h4>
          <h2>Follow-up Discussion</h2>
          <h3>What did you observe?</h3>
          <h3>What should the children have done differently?</h3>
          <h3>
            What would you do if you had such greedy children in your family?
          </h3>
          <h3>
            The indigenous peoples of North America refer to the earth as their
            'mother' In what ways is the earth like our mother?{" "}
            <strong>
              <em>
                Allow the group to give their answers, but if they struggle,
                help them see that the earth provides for us and without it, we
                could not have life. In the Bible, God is said to have created
                human beings from dust!
              </em>
            </strong>
          </h3>
          <h3>
            What can we learn from the role play about caring for our Mother
            Earth?
          </h3>
          <h3>
            If we neglect to feed our Mother Earth, will we be able to survive
            ourselves?
          </h3>
          <h3>What are some of the ways we can feed our Mother Earth?</h3>
        </div>
      </div>
    </div>
  );

  const handleOpenDocument1 = () => {
    setActiveButton(1);
    setDocumentContent(doc1HTML);
  };

  const handleOpenDocument2 = () => {
    setActiveButton(2);
    setDocumentContent(doc2HTML);
  };

  useEffect(() => {
    localStorage.setItem("documentContent1", doc1HTML);
    localStorage.setItem("documentContent2", doc2HTML);
  }, []);

  useEffect(() => {
    const savedContent1 = localStorage.getItem("documentContent1");
    const savedContent2 = localStorage.getItem("documentContent2");

    if (savedContent1) setDocumentContent(savedContent1);
    if (savedContent2 && activeButton === 2) setDocumentContent(savedContent2);
  }, [activeButton]);

  return (
    <div>
      <Container className="my-4">
        <div
          style={{ cursor: "pointer", marginBottom: "10px" }}
          onClick={() => navigate("/")}
        >
          <b>Document Viewer</b>
        </div>
        <div className="d-flex flex-column align-items-center mt-4">
          <Button
            size="lg"
            className="btnSI"
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "10px 10px",
              borderRadius: "6px",
              background: activeButton === 1 ? "#279A82" : "#FFFFFF",
              border: "1px solid #279A82",
              color: activeButton === 1 ? "#FFFFFF" : "#279A82",
            }}
            onClick={handleOpenDocument1}
          >
            SI Technology Participatory Decision Tool
          </Button>
          <Button
            size="lg"
            className="btnSI mt-3"
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "10px 10px",
              borderRadius: "6px",
              background: activeButton === 2 ? "#279A82" : "#FFFFFF",
              border: "1px solid #279A82",
              color: activeButton === 2 ? "#FFFFFF" : "#279A82",
            }}
            onClick={handleOpenDocument2}
          >
            SI Training Strategy 2024-07
          </Button>
        </div>
        {documentContent && (
          <div
            className="document-content mt-4"
            dangerouslySetInnerHTML={{ __html: documentContent }}
          />
        )}
      </Container>
    </div>
  );
};

export default DocumentViewer;
