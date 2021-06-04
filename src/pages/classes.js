import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";

import Layout from "../components/Layout";

import CtaContact from "../components/CtaContact";
import ClassCards from "../components/ClassCards";

import "./classes.scss";

// option builders!

// from https://github.com/joe-re/object-dig/blob/master/src/index.js
const dig = (target, ...keys) => {
  let digged = target;
  for (const key of keys) {
    if (typeof digged === "undefined" || digged === null) {
      return undefined;
    }
    digged = digged[key];
  }
  return digged;
};

const buildOption = (name, value, label) => {
  const id = `${name}_${String(val).toLowerCase().split(" ").join("_")}`;

  return { id, name, value, label };
};

const buildOptions = (collection, filter) => {
  let options = [];

  for (let item of collection) {
    const label = dig(item, filter.optionLabelKeys);
    const rawValue = dig(item, filter.optionValueKeys);

    if (Array.isArray(rawValue)) {
      // associated with many
      for (let value of rawValue) {
        if (!!value && !options.some((opt) => opt.value === value)) {
          const option = buildOption(filter.filterKey, value, label);
          options.push(option);
        }
      }
    } else {
      // just a string or id number
      if (!!rawValue && !options.some((opt) => opt.value === rawValue)) {
        const option = buildOption(filter.filterKey, rawValue, label);
        options.push(option);
      }
    }
  }

  return options;
};

// looks like `{ filterKey1: initialValue1, filterKey2, initialValue2 }`
const buildInitialFilter = (filters) =>
  filters.reduce(
    (initialFilter,
    (filter) => {
      initialFilter[filter.filterKey] = filter.initialValue;
      return initialFilter;
    }),
    {}
  );

// check check filter, try to knock out
const filterLevel = (activeFilter, level) => {
  if (activeFilter.experiences.length) {
    // filter for matching experience
    const filteredExps = activeFilter.experiences;
    const levelExp = level.details.experience;
    if (!filteredExps.some((exp) => levelExp === exp)) {
      return false;
    }
  }

  if (activeFilter.genders.length) {
    // filter for matching gender
    const filteredGenders = activeFilter.genders;
    const levelGender = level.details.gender;
    if (!filteredGenders.some((gender) => levelGender === gender)) {
      return false;
    }
  }

  if (activeFilter.skills.length) {
    // filter for any class skill overlap
    const filteredSkills = activeFilter.skills;
    const levelSkills = level.details.skills;
    if (!filteredSkills.some((skill) => levelSkills.includes(skill))) {
      return false;
    }
  }

  if (activeFilter.sellingPoints.length) {
    // filter for any sellingPoint overlap
    const filteredPoints = activeFilter.sellingPoints;
    const levelPoints = level.details.sellingPoints;
    if (
      !filteredPoints.some((point) =>
        level.details.sellingPoints.includes(point)
      )
    ) {
      return false;
    }
  }

  return true; // nothing said no!
};

const filterTemplate = [
  {
    label: "EXPERIENCE",
    filterKey: "experiences",
    type: "checkbox",
    initialValue: [],
    optionValueKeys: ["details", "experience"],
    optionLabelKeys: ["details", "experience"],
  },
  {
    label: "GENDER",
    filterKey: "genders",
    type: "checkbox",
    initialValue: [],
    optionValueKeys: ["details", "gender"],
    optionLabelKeys: ["details", "gender"],
  },
  {
    label: "SKILLS",
    filterKey: "skills",
    type: "checkbox",
    initialValue: [],
    optionValueKeys: ["details", "skills"],
    optionLabelKeys: ["details", "skills"],
  },
  {
    label: "LOOKING FOR",
    filterKey: "sellingPoints",
    type: "checkbox",
    initialValue: [],
    optionLabelKeys: ["details", "sellingPoints"],
    optionValueKeys: ["details", "sellingPoints"],
  },
];

const ClassPanel = ({ experienceLevels }) => {
  const filters = React.useMemo(
    () =>
      filterTemplate.map((filter) => ({
        ...filter,
        options: buildOptions(experienceLevels, filter),
      })),
    [experienceLevels]
  );
  const [activeFilter, setActiveFilter] = useState(buildInitialFilter(filters));
  const activeLevels = experienceLevels.filter((level) =>
    filterLevel(activeFilter, level)
  );

  // NOTE: currently only checkbox supported
  const updateActiveFilter = (filter, event) => {
    const value = event.target.value;

    if (event.target.checked) {
      setActiveFilter((current) => ({
        ...current,
        [filter.filterKey]: [...current[filter.filterKey], value], // add item
      }));
    } else {
      setActiveFilter((current) => ({
        ...current,
        [filter.filterKey]: current[filter.filterKey].filter(
          (val) => val !== value
        ), // filter item
      }));
    }
  };

  return (
    <div className="ClassPanel">
      <form
        className="ClassPanel__filter-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {filters.map((filter, filterIndex) => (
          <div className="filter-group" key={filterIndex}>
            <h4 className="filter-group__label">{filter.label}</h4>
            <ul className="filter-group__options">
              {filter.options.map((opt) => (
                <li className="filter-group__options__item" key={opt.id}>
                  <input
                    type={filter.type}
                    id={opt.id}
                    name={opt.name}
                    value={opt.value}
                    onChange={(event) => updateActiveFilter(filter, event)}
                    checked={activeFilter[filter.filterKey].includes(opt.value)}
                  />
                  <label htmlFor={opt.id}>{opt.value}</label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </form>
      <ClassCards activeLevels={activeLevels} />
    </div>
  );
};

const ClassesPage = ({ data }) => {
  const experienceLevels = data.experienceLevelQuery.experienceLevels?.map(
    (levelNode) => {
      return {
        ...levelNode.frontmatter,
        slug: levelNode.fields.slug,
      };
    }
  );

  const title = "Our Classes";
  const description =
    "If you’re not sure where to begin, this is a great place to start.";

  return (
    <Layout>
      <Helmet titleTemplate={title}>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="classes">
        <div className="classes__hero">
          <h1 className="classes__hero__title">{title}</h1>
          <h2 className="classes__hero__subtitle">{description}</h2>
        </div>
        <ClassPanel experienceLevels={experienceLevels || []} />
      </div>
      <CtaContact />
    </Layout>
  );
};

export default ClassesPage;

export const pageQuery = graphql`
  query CoursesPageAndExperienceData {
    experienceLevelQuery: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "experience-levels" } } }
    ) {
      experienceLevels: nodes {
        frontmatter {
          heading
          title
          details {
            age
            gender
            byline
            skills
            experience
            sellingPoints
          }
          thumbnail {
            childImageSharp {
              fluid(maxWidth: 480, quality: 80) {
                ...GatsbyImageSharpFluid
              }
            }
            extension
            publicURL
          }
        }
        fields {
          slug
        }
      }
    }
  }
`;
