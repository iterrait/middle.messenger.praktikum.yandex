import { Block } from '../../core/block';
import UserPreviewTmpl from './user-preview-tmpl';

interface UserPreviewProps {
  firstName?: string | null,
  secondName?: string | null,
}

export class UserPreview extends Block<UserPreviewProps> {
  constructor(props: UserPreviewProps) {
    super({ ...props });
  }

  render(): DocumentFragment {
    return this.compile(UserPreviewTmpl, this.props);
  }
}
