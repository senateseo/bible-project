import React from "react";

const About = () => {
  return (
    <div className="mt-36 prose prose-indigo prose-lg text-gray-500 mx-auto font-light text-royalf">
      <h2>About Hisword</h2>
      <p>
        Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in.
        Convallis arcu ipsum urna nibh. Pharetra, euismod vitae interdum mauris
        enim, consequat vulputate nibh. Maecenas pellentesque id sed tellus
        mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi.
        Pellentesque nam sed nullam sed diam turpis ipsum eu a sed convallis
        diam.
      </p>
      <blockquote>
        <p>
          Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum
          urna sed consectetur neque tristique pellentesque. Blandit amet, sed
          aenean erat arcu morbi.
        </p>
      </blockquote>
      <p>
        Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim.
        Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent
        donec est. Odio penatibus risus viverra tellus varius sit neque erat
        velit.
      </p>
      <figure>
        <img
          className="w-full rounded-lg"
          src="/about.jpg"
          alt=""
          width={1310}
          height={873}
        />
        <figcaption>
          Sagittis scelerisque nulla cursus in enim consectetur quam.
        </figcaption>
      </figure>
      <h2>Everything you need to get up and running</h2>

      <p>
        Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim.
        Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent
        donec est. Odio penatibus risus viverra tellus varius sit neque erat
        velit.
      </p>
    </div>
  );
};

export default About;
