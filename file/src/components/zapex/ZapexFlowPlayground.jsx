"use client";
import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import zapexScreens, { categoryOrder } from "./zapexScreens";

const badgeVariants = {
  primary: "badge text-bg-primary",
  secondary: "badge text-bg-secondary",
  success: "badge text-bg-success",
  danger: "badge text-bg-danger",
  warning: "badge text-bg-warning",
  info: "badge text-bg-info",
  dark: "badge text-bg-dark",
};

const ZapexFlowPlayground = () => {
  const groupedScreens = useMemo(() => {
    const groups = {};
    categoryOrder.forEach((category) => {
      groups[category] = [];
    });
    zapexScreens
      .sort((a, b) => a.order - b.order)
      .forEach((screen) => {
        if (!groups[screen.category]) groups[screen.category] = [];
        groups[screen.category].push(screen);
      });
    return groups;
  }, []);

  const [activeScreenId, setActiveScreenId] = useState(zapexScreens[0]?.id);
  const activeScreen = zapexScreens.find((screen) => screen.id === activeScreenId);

  return (
    <section className='zapex-flow-area'>
      <div className='d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4'>
        <div>
          <p className='text-uppercase text-muted fw-semibold mb-1'>ZapEx</p>
          <h2 className='mb-2'>Experience Control Lab</h2>
          <p className='text-muted mb-0'>
            Navigate every functional and non-functional story through an interactive sandbox without leaving the
            dashboard.
          </p>
        </div>
        <div className='d-flex gap-2 flex-wrap'>
          <button type='button' className='btn btn-outline-secondary btn-sm'>
            <Icon icon='solar:upload-outline' className='me-1' /> Export journey
          </button>
          <button type='button' className='btn btn-primary btn-sm'>
            <Icon icon='solar:play-bold-duotone' className='me-1' /> Run end-to-end test
          </button>
        </div>
      </div>

      <div className='row g-4'>
        <div className='col-12 col-xl-3'>
          <div className='card border-0 shadow-sm h-100'>
            <div className='card-body'>
              <div className='d-flex align-items-center justify-content-between mb-4'>
                <h5 className='mb-0'>Screen Library</h5>
                <span className='badge text-bg-primary rounded-pill'>{zapexScreens.length} views</span>
              </div>
              <div className='zapex-screen-menu d-flex flex-column gap-4'>
                {Object.entries(groupedScreens).map(([category, screens]) => (
                  <div key={category}>
                    <p className='text-uppercase text-muted fw-semibold small mb-2'>{category}</p>
                    <div className='d-flex flex-column gap-2'>
                      {screens.map((screen) => (
                        <button
                          key={screen.id}
                          type='button'
                          className={`btn btn-light text-start shadow-sm border ${
                            activeScreenId === screen.id ? "active" : ""
                          }`}
                          onClick={() => setActiveScreenId(screen.id)}
                        >
                          <span className='d-flex flex-column'>
                            <span className='fw-semibold'>{screen.title}</span>
                            <span className='text-muted small'>{screen.description.substring(0, 60)}...</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='col-12 col-xl-9'>
          {activeScreen ? (
            <ZapexScreen screen={activeScreen} />
          ) : (
            <div className='card border-0 shadow-sm h-100'>
              <div className='card-body text-center py-5'>
                <Icon icon='solar:info-circle-bold-duotone' className='display-4 text-muted mb-3' />
                <p className='text-muted mb-0'>Select a screen from the library to begin.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const ZapexScreen = ({ screen }) => {
  return (
    <div className='d-flex flex-column gap-4'>
      <div className='card border-0 shadow-sm'>
        <div className='card-body'>
          <div className='d-flex flex-wrap justify-content-between gap-3'>
            <div>
              <p className='text-uppercase text-muted small mb-1'>{screen.category}</p>
              <h4 className='mb-1'>{screen.title}</h4>
              <p className='text-muted mb-2'>{screen.description}</p>
              {screen.status ? (
                <span className={`${badgeVariants[screen.status.variant] ?? "badge text-bg-secondary"}`}>
                  {screen.status.label}
                </span>
              ) : null}
            </div>
            {screen.actions?.length ? (
              <div className='d-flex flex-wrap gap-2 align-items-start'>
                {screen.actions.map((action) => (
                  <span key={action} className='badge rounded-pill text-bg-light text-dark border'>
                    {action}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {screen.blocks?.map((block) => (
        <ScreenBlock key={`${screen.id}-${block.id}`} block={block} />
      ))}
    </div>
  );
};

const ScreenBlock = ({ block }) => {
  switch (block.type) {
    case "form":
      return <FormBlock block={block} />;
    case "stats":
      return <StatsBlock block={block} />;
    case "table":
      return <TableBlock block={block} />;
    case "list":
      return <ListBlock block={block} />;
    case "timeline":
      return <TimelineBlock block={block} />;
    case "cards":
      return <CardsBlock block={block} />;
    case "statusGrid":
      return <StatusGridBlock block={block} />;
    case "actions":
      return <ActionsBlock block={block} />;
    case "log":
      return <LogBlock block={block} />;
    case "kanban":
      return <KanbanBlock block={block} />;
    case "settings":
      return <SettingsBlock block={block} />;
    case "notification":
      return <NotificationBlock block={block} />;
    case "error":
      return <ErrorBlock block={block} />;
    case "maintenance":
      return <MaintenanceBlock block={block} />;
    default:
      return (
        <div className='card border-0 shadow-sm'>
          <div className='card-body'>
            <p className='mb-0'>Unsupported block type: {block.type}</p>
          </div>
        </div>
      );
  }
};

const FormBlock = ({ block }) => {
  return (
    <div className='card border-0 shadow-sm'>
      <div className='card-body'>
        <div className='d-flex justify-content-between align-items-start mb-3 gap-3'>
          <div>
            <h5 className='mb-1'>{block.title}</h5>
            {block.subtitle ? <p className='text-muted mb-0'>{block.subtitle}</p> : null}
          </div>
          {block.footerActions?.length ? (
            <div className='d-flex flex-wrap gap-2'>
              {block.footerActions.map((action) => (
                <button
                  key={action.label}
                  type='button'
                  className={getButtonClass(action.variant ?? "outline-secondary")}
                >
                  {action.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <form className='row g-3'>
          {block.fields?.map((field) => (
            <div
              key={field.label}
              className={field.fullWidth ? "col-12" : block.columns === 2 ? "col-md-6" : "col-12"}
            >
              {field.type !== "checkbox" ? (
                <label className='form-label fw-semibold'>{field.label}</label>
              ) : null}
              {renderFormControl(field)}
              {field.helper && field.type !== "checkbox" ? (
                <small className='text-muted'>{field.helper}</small>
              ) : null}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

const renderFormControl = (field) => {
  const baseProps = {
    className: 'form-control',
    placeholder: field.placeholder,
    readOnly: field.readOnly,
    required: field.required,
  };
  switch (field.type) {
    case "select":
      return (
        <select className='form-select'>
          {field.options?.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      );
    case "textarea":
      return <textarea {...baseProps} rows={4} />;
    case "checkbox":
      return (
        <div className='form-check mt-4'>
          <input className='form-check-input' type='checkbox' id={field.label} defaultChecked={field.checked} />
          <label className='form-check-label' htmlFor={field.label}>
            {field.label}
          </label>
        </div>
      );
    case "file":
      return <input type='file' className='form-control' />;
    default:
      return <input type={field.type ?? "text"} {...baseProps} />;
  }
};

const StatsBlock = ({ block }) => (
  <div className='card border-0 shadow-sm'>
    <div className='card-body'>
      <h5 className='mb-3'>{block.title}</h5>
      <div className='row g-3'>
        {block.items?.map((item) => (
          <div key={item.label} className='col-md-4'>
            <div className='border rounded-3 p-3 h-100'>
              <p className='text-muted text-uppercase small mb-1'>{item.label}</p>
              <h5 className='mb-1'>{item.value}</h5>
              {item.variant ? (
                <span className={`${badgeVariants[item.variant] ?? "badge text-bg-light text-dark"}`}>
                  {item.note ?? item.label}
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TableBlock = ({ block }) => (
  <div className='card border-0 shadow-sm'>
    <div className='card-body'>
      <h5 className='mb-3'>{block.title}</h5>
      <div className='table-responsive'>
        <table className='table align-middle mb-0'>
          <thead>
            <tr>
              {block.columns?.map((column) => (
                <th key={column} className='text-muted fw-semibold small'>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows?.map((row, index) => (
              <tr key={`${block.id}-${index}`}>
                {block.columns?.map((column) => (
                  <td key={`${column}-${index}`}>{row[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const ListBlock = ({ block }) => (
  <div className='card border-0 shadow-sm'>
    <div className='card-body'>
      <h5 className='mb-3'>{block.title}</h5>
      <ul className='list-group list-group-flush'>
        {block.items?.map((item) => (
          <li key={item.label} className='list-group-item d-flex justify-content-between align-items-center'>
            <span>{item.label}</span>
            {item.badge ? <span className='badge text-bg-light text-dark border'>{item.badge}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const TimelineBlock = ({ block }) => (
  <div className='card border-0 shadow-sm'>
    <div className='card-body'>
      <h5 className='mb-3'>{block.title}</h5>
      <div className='d-flex flex-column gap-3'>
        {block.steps?.map((step, index) => (
          <div key={step.label} className='d-flex gap-3'>
            <div className='text-primary fw-bold'>{index + 1}</div>
            <div>
              <p className='mb-0 fw-semibold'>{step.label}</p>
              <small className='text-muted'>{step.description}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CardsBlock = ({ block }) => {
  const columnSize = block.columns ? Math.floor(12 / block.columns) : 6;
  return (
    <div className='card border-0 shadow-sm'>
      <div className='card-body'>
        <h5 className='mb-3'>{block.title}</h5>
        <div className='row g-3'>
          {block.cards?.map((card) => (
            <div key={card.title} className={`col-12 col-md-${columnSize}`}>
              <div className='border rounded-3 p-3 h-100'>
                <h6 className='mb-1'>{card.title}</h6>
                <p className='text-muted mb-2'>{card.body}</p>
                {card.footer ? <span className='small text-uppercase text-muted'>{card.footer}</span> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatusGridBlock = ({ block }) => (
  <div className='card border-0 shadow-sm'>
    <div className='card-body'>
      <h5 className='mb-3'>{block.title}</h5>
      <div className='row g-3'>
        {block.statuses?.map((status) => (
          <div key={status.label} className='col-md-4'>
            <div className='border rounded-3 p-3 h-100'>
              <p className='text-muted small mb-1'>{status.label}</p>
              <h6 className='mb-1'>{status.value}</h6>
              {status.variant ? (
                <span className={`${badgeVariants[status.variant] ?? "badge text-bg-light text-dark"}`}>
                  {status.variant}
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ActionsBlock = ({ block }) => (
  <div className='card border-0 shadow-sm'>
    <div className='card-body'>
      <h5 className='mb-3'>{block.title}</h5>
      <div className='d-flex flex-wrap gap-2'>
        {block.actions?.map((action) => (
          <button key={action.label} type='button' className={getButtonClass(action.variant ?? "light")}>
            {action.label}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const LogBlock = ({ block }) => (
  <div className='card border-0 shadow-sm'>
    <div className='card-body'>
      <h5 className='mb-3'>{block.title}</h5>
      <div className='d-flex flex-column gap-3'>
        {block.events?.map((event) => (
          <div key={event.title} className='border-start border-3 ps-3'>
            <p className='mb-1 fw-semibold'>{event.title}</p>
            <small className='text-muted d-block'>{event.meta}</small>
            <small className='text-uppercase text-muted'>{event.time}</small>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const KanbanBlock = ({ block }) => (
  <div className='card border-0 shadow-sm'>
    <div className='card-body'>
      <h5 className='mb-3'>{block.title}</h5>
      <div className='row g-3'>
        {block.columns?.map((column) => (
          <div key={column.title} className='col-md-4'>
            <div className='border rounded-3 p-3 h-100'>
              <p className='text-uppercase text-muted small mb-2'>{column.title}</p>
              <div className='d-flex flex-column gap-2'>
                {column.items?.map((item) => (
                  <div key={item} className='border rounded-3 p-2 bg-light'>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SettingsBlock = ({ block }) => (
  <div className='card border-0 shadow-sm'>
    <div className='card-body'>
      <h5 className='mb-3'>{block.title}</h5>
      <div className='d-flex flex-column gap-3'>
        {block.items?.map((item) => (
          <div key={item.label} className='d-flex justify-content-between align-items-center border rounded-3 p-3'>
            <div>
              <p className='fw-semibold mb-0'>{item.label}</p>
              <small className='text-muted'>{item.description}</small>
            </div>
            <div className='form-check form-switch'>
              <input className='form-check-input' type='checkbox' defaultChecked={item.enabled} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const NotificationBlock = ({ block }) => (
  <div className='card border-0 shadow-sm'>
    <div className='card-body'>
      <h5 className='mb-3'>{block.title}</h5>
      <div className='list-group list-group-flush'>
        {block.notifications?.map((notification) => (
          <div key={notification.title} className='list-group-item d-flex justify-content-between'>
            <div>
              <p className='mb-1 fw-semibold'>{notification.title}</p>
              <small className='text-muted'>{notification.body}</small>
            </div>
            <div className='text-end'>
              <span className='small text-muted d-block'>{notification.time}</span>
              <span className={`${badgeVariants[notification.variant] ?? "badge text-bg-light text-dark"}`}>
                {notification.variant}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ErrorBlock = ({ block }) => (
  <div className='card border-0 shadow-sm'>
    <div className='card-body'>
      <h5 className='mb-3'>{block.title}</h5>
      <div className='row g-3'>
        {block.errors?.map((error) => (
          <div key={error.code} className='col-md-4'>
            <div className='border rounded-3 p-3 h-100 text-center'>
              <h3 className='mb-1'>{error.code}</h3>
              <p className='fw-semibold mb-1'>{error.label}</p>
              <small className='text-muted'>{error.message}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MaintenanceBlock = ({ block }) => (
  <div className='card border-0 shadow-sm text-center'>
    <div className='card-body py-5'>
      <Icon icon='solar:server-square-cloud-bold-duotone' className='display-4 text-warning mb-3' />
      <h4 className='mb-1'>{block.title}</h4>
      <p className='text-muted mb-2'>{block.details}</p>
      <span className='badge text-bg-dark'>{block.schedule}</span>
    </div>
  </div>
);

const getButtonClass = (variant) => {
  switch (variant) {
    case "primary":
      return "btn btn-primary";
    case "secondary":
      return "btn btn-secondary";
    case "success":
      return "btn btn-success";
    case "danger":
      return "btn btn-danger";
    case "outline-primary":
      return "btn btn-outline-primary";
    case "outline-secondary":
      return "btn btn-outline-secondary";
    case "light":
      return "btn btn-light";
    case "link":
      return "btn btn-link";
    default:
      return "btn btn-outline-secondary";
  }
};

export default ZapexFlowPlayground;
