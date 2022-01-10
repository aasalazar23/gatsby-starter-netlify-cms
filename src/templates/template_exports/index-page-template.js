import React from "react";
import PropTypes from "prop-types";
import BlogRoll from "../../components/BlogRoll";
import BgSmallMp4 from "../../assets/bg_small.mp4";
import { ButtonLink, Blurb, Review, Iframe } from "../../components/Atoms";
import PreviewCompatibleImage from "../../components/PreviewCompatibleImage";

const FeaturedProject = ({ studentProfile, project }) => {
  const { name, age, interests, image, className, classUrl } = studentProfile;
  return (
    <section className="featured-project">
      <div className="featured-project__heading">
        <h1>Featured Project</h1>
        <ButtonLink content={classUrl} title="Build it!" />
      </div>
      <div className="featured-project__content">
        <div className="featured-project__content__iframe">
          <Iframe
            bgColor="transparent"
            content={project.content}
            ratio="ratio1x1"
            title={project.title}
          />
        </div>
        <div className="featured-project__content__info">
          <div className="profile">
            <div className="profile__image">
              <PreviewCompatibleImage imageInfo={image} />
            </div>
            <div className="profile__info">
              <h3>Name: {name}</h3>
              <p>
                <em>Age: {age}</em>
              </p>
              <p>{interests}</p>
              <p>Current class: {className}</p>
            </div>
          </div>
          <div className="project-details">
            <h2>Project Title: {project.title}</h2>
            <p>{project.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const IndexPageTemplate = ({
  blogRoll,
  differentiators,
  featuredProject,
  hero,
  mainpitch,
  reviews,
}) => {
  return (
    <div className="homepage">
      <div className="homepage__hero">
        <div className="banner">
          <h1 className="">{hero.heading}</h1>
          <p className="">{hero.subheading}</p>
          <div className="hero__buttons">
            {hero.buttons.list.map((button, index) => (
              <ButtonLink
                {...button}
                fgColor={hero.buttons.fgColor}
                textColor={hero.buttons.textColor}
                key={index}
              />
            ))}
          </div>
        </div>
        <video autoPlay muted loop id="indexVideo" className="bg-video">
          <source src={BgSmallMp4} type="video/mp4" />
        </video>
      </div>
      <div className="homepage__main">
        <section className="main-pitch">
          <div className="content">
            <div className="tile">
              <h1 className="title">{mainpitch.title}</h1>
            </div>
            <div className="tile">
              <h3 className="subtitle">{mainpitch.description}</h3>
            </div>
            {!!mainpitch.buttons &&
              mainpitch.buttons.list.map((button, index) => (
                <ButtonLink
                  {...button}
                  fgColor={mainpitch.buttons.fgColor}
                  textColor={mainpitch.buttons.textColor}
                  key={index}
                />
              ))}
          </div>
        </section>
        <section className="differentiators">
          {differentiators.map((differentiator, index) => (
            <Blurb {...differentiator} key={index} />
          ))}
        </section>
        <section className="features">
          <div className="features__project">
            <FeaturedProject {...featuredProject} />
          </div>
          <div className="features__class"></div>
          <div className="features__blogs">
            <BlogRoll blogRoll={blogRoll} />
          </div>
        </section>
        <section className="testimonials">
          <h1>What Families Are Saying About The Coding Space</h1>
          <div className="testimonials__reviews">
            {reviews.map((review, index) => (
              <Review {...review} key={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  hero: PropTypes.shape({
    heading: PropTypes.string,
    subheading: PropTypes.string,
    buttons: PropTypes.object,
  }),
  mainpitch: PropTypes.object,
};
