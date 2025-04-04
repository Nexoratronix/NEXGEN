import React from "react";
import  Link  from "next/link";

//import UserImage
import userImage3 from "../../../assets/images/user/img-03.jpg";

const BlogColumn = () => {
  return (
    <React.Fragment>
      <ul className="list-inline mb-0 mt-3 text-muted">
        <li className="list-inline-item">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              <img
                src={userImage3}
                alt=""
                className="avatar-sm rounded-circle"
              />
            </div>
            <div className="ms-3">
              <Link href="/blogauther" className="primary-link">
                <h6 className="mb-0">By Alice Mellor</h6>
              </Link>
            </div>
          </div>
        </li>
        <li className="list-inline-item">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              <i className="uil uil-calendar-alt"></i>
            </div>
            <div className="ms-2">
              <p className="mb-0"> Aug 02, 2021</p>
            </div>
          </div>
        </li>
        <li className="list-inline-item">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              <i className="uil uil-comments-alt"></i>
            </div>
            <div className="ms-2 flex-grow-1">
              <p className="mb-0"> 2 Comments</p>
            </div>
          </div>
        </li>
      </ul>
      <div className="mt-4">
        <h5>What makes the best co-working space?</h5>
        <p className="text-muted">
          Objectively pursue diverse catalysts for change for interoperable
          meta-services. Distinctively re-engineer revolutionary meta-services
          and premium architectures. Intrinsically incubate intuitive
          opportunities and real-time potentialities. Appropriately communicate
          one-href-one technology.
        </p>
        <p className="text-muted mb-4">
          Home renovations, especially those involving plentiful of demolition
          can be a very dusty affair. The same is true as we experience the
          emotional sensation of stress from our first instances of social
          rejection ridicule. We quickly learn href fear and thus automatically
          avoid potentially stressful situations of all kinds, including the
          most common of all making mistakes.
        </p>
        <figure className="blog-blockquote text-center">
          <blockquote className="blockquote">
            <p className="fs-17">
              "A business consulting agency is involved in the planning,
              implementation, and education of businesses."
            </p>
          </blockquote>
          <figcaption className="blockquote-footer fs-15 mb-4">
            Creative Agency
            <cite title="Source Title" className="text-primary fw-semibold">
              {" "}
              Alice Mellor
            </cite>
          </figcaption>
        </figure>
        <p className="text-muted">
          Whether article spirits new her covered hastily sitting her. Money
          witty books nor son add. Chicken age had evening believe but proceed
          pretend mrs. At missed advice my it no sister. Miss told ham dull knew
          see she spot near can. Spirit her entire her called.
        </p>
        <p className="text-muted">
          The advantage of its Latin origin and the relative meaninglessness of
          Lorum Ipsum is that the text does not attract attention href itself or
          distract the viewer's attention from the layout.
        </p>
        <div className="d-flex align-items-center mb-4">
          <div className="flex-shrink-0">
            <b>Tags:</b>
          </div>
          <div className="flex-grow-1 ms-2 d-flex flex-wrap align-items-start gap-1">
            <Link
              href="#"
              className="badge bg-success-subtle text-success mt-1 fs-14"
            >
              Business
            </Link>
            <Link
              href="#"
              className="badge bg-success-subtle text-success mt-1 fs-14"
            >
              design
            </Link>
            <Link
              href="#"
              className="badge bg-success-subtle text-success mt-1 fs-14"
            >
              Creative
            </Link>
            <Link
              href="#"
              className="badge bg-success-subtle text-success mt-1 fs-14"
            >
              Event
            </Link>
          </div>
        </div>
        <ul className="blog-social-menu list-inline mb-0 text-end">
          <li className="list-inline-item">
            <b>Share post:</b>
          </li>
          <li className="list-inline-item">
            <Link href="#" className="social-link bg-primary-subtle text-primary">
              <i className="uil uil-facebook-f"></i>
            </Link>
          </li>
          <li className="list-inline-item">
            <Link href="#" className="social-link bg-success-subtle text-success">
              <i className="uil uil-whatsapp"></i>
            </Link>
          </li>
          <li className="list-inline-item">
            <Link href="#" className="social-link bg-blue-subtle text-blue">
              <i className="uil uil-linkedin-alt"></i>
            </Link>
          </li>
          <li className="list-inline-item">
            <Link href="#" className="social-link bg-danger-subtle text-danger">
              <i className="uil uil-envelope"></i>
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default BlogColumn;
