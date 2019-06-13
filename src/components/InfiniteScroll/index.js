// @ts-nocheck
import * as React from 'react';
import { fetchMoreOnInfiniteScrollLoad } from './tallViewports';

export default class InfiniteScroll extends React.Component {
  static defaultProps = {
    element: 'div',
    hasMore: false,
    initialLoad: true,
    isReverse: false,
    pageStart: 0,
    scrollElement: null,
    scrollcomponent: null,
    threshold: 250,
    useWindow: true,
  };

  constructor(props) {
    super(props);

    this._defaultLoader = props.loader;
    this.scrollListener = this.scrollListener.bind(this);
  }

  componentDidMount() {
    this.pageLoaded = this.props.pageStart;
    this.attachScrollListener();
  }

  componentDidUpdate(prevProps) {
    const curr = this.props;

    /*
      if the outer query is fetching more, there's no reason to re-check the scroll
      position or re-attach a scroll listener - a refetch is already running!
    */
    if (curr.isLoadingMore) {
      return;
    }

    this.attachScrollListener();
  }

  render() {
    const {
      children,
      element,
      hasMore,
      initialLoad,
      loader,
      loadMore,
      pageStart,
      threshold,
      useWindow,
      isReverse,
      scrollElement,
      isLoadingMore,
      ...props
    } = this.props;

    if (scrollElement) {
      props.ref = node => {
        this.scrollcomponent = scrollElement;
      };
    } else {
      props.ref = node => {
        this.scrollcomponent = node;
      };
    }

    return React.createElement(
      element,
      props,
      children,
      hasMore && (loader || this._defaultLoader)
    );
  }

  calculateTopPosition(el) {
    if (!el) {
      return 0;
    }
    return el.offsetTop + this.calculateTopPosition(el.offsetParent);
  }

  scrollListener() {
    const el = this.scrollcomponent;
    const scrollEl = window;

    let offset;
    if (this.props.scrollElement) {
      if (this.props.isReverse) {
        offset = el.scrollTop;
      } else {
        offset = el.scrollHeight - el.scrollTop - el.clientHeight;
      }
    } else if (this.props.useWindow) {
      let scrollTop =
        scrollEl.pageYOffset !== undefined
          ? scrollEl.pageYOffset
          : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      if (this.props.isReverse) {
        offset = scrollTop;
      } else {
        offset = this.calculateTopPosition(el) + el.offsetHeight - scrollTop - window.innerHeight;
      }
    } else {
      if (this.props.isReverse) {
        offset = el.parentNode.scrollTop;
      } else {
        offset = el.scrollHeight - el.parentNode.scrollTop - el.parentNode.clientHeight;
      }
    }

    if (
      offset < Number(this.props.threshold) ||
      fetchMoreOnInfiniteScrollLoad(el, this.props.className)
    ) {
      this.detachScrollListener();
      // Call loadMore after detachScrollListener to allow for non-async loadMore functions
      if (typeof this.props.loadMore === 'function') {
        this.props.loadMore((this.pageLoaded += 1));
      }
    }
  }

  attachScrollListener() {
    if (!this.props.hasMore) {
      return;
    }

    let scrollEl = window;
    if (this.props.scrollElement) {
      scrollEl = this.scrollcomponent;
    } else if (this.props.useWindow === false) {
      scrollEl = this.scrollcomponent.parentNode;
    }

    scrollEl.addEventListener('scroll', this.scrollListener);
    scrollEl.addEventListener('resize', this.scrollListener);

    if (fetchMoreOnInfiniteScrollLoad(scrollEl, this.props.className)) {
      this.props.loadMore((this.pageLoaded += 1));
    }

    if (this.props.initialLoad) {
      this.scrollListener();
    }
  }

  detachScrollListener() {
    let scrollEl = window;
    if (this.props.scrollElement) {
      scrollEl = this.scrollcomponent;
    } else if (this.props.useWindow === false) {
      scrollEl = this.scrollcomponent.parentNode;
    }

    scrollEl.removeEventListener('scroll', this.scrollListener);
    scrollEl.removeEventListener('resize', this.scrollListener);
  }

  componentWillUnmount() {
    this.detachScrollListener();
  }

  // Set a defaut loader for all your `InfiniteScroll` components
  setDefaultLoader(loader) {
    this._defaultLoader = loader;
  }
}