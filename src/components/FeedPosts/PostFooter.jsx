import React from "react";
import {
  Flex,
  Box,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assets/constants";
import usePostComments from "../../hooks/usePostComments";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../util/timeAgo";
import CommentsModal from "../Comment/CommentsModal";

const PostFooter = ({ post, isProfilePage, creator }) => {
  const { isCommenting, handlePostComment } = usePostComments();
  const [comment, setComment] = React.useState("");
  const authUser = useAuthStore((state) => state.user);
  const commentRef = React.useRef(null);
  const { handleLikePost, isLiked, likes } = useLikePost(post);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    setComment("");
  };

  return (
    <Box mb={5} mt="auto">
      <Flex alignItems={"center"} gap={4} w={"fill"} pt={0} mb={2} mt={4}>
        <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>
        <Box
          cursor={"pointer"}
          fontSize={18}
          onClick={() => commentRef.current.focus()}
        >
          <CommentLogo />
        </Box>
      </Flex>
      <Text fontSize={12} fontWeight={600} mb={2}>
        {likes} likes
      </Text>

      {isProfilePage && (
        <Text fontSize={12} color="gray">
          Posted {timeAgo(post.createdAt)}
        </Text>
      )}

      {!isProfilePage && (
        <Box>
          <Text fontSize="sm" fontWeight={700}>
            {creator?.username}{" "}
            <Text as={"span"} fontWeight={400}>
              {post?.caption}
            </Text>
          </Text>
          {post.comments.length > 0 && (
            <Text fontSize="sm" color="gray" cursor={"pointer"} onClick={onOpen}>
              View all {post?.comments.length} comments
            </Text>
          )}

          {isOpen && <CommentsModal post={post} isOpen={isOpen} onClose={onClose} />}
        </Box>
      )}

      {authUser && (
        <Flex alignItems={"center"} gap={2} w="full">
          <InputGroup>
            {/* Borderless Bottom and Focus Style */}
            <Input
              variant="flushed"
              placeholder="Add a comment..."
              fontSize={14}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              ref={commentRef}
            />
            <InputRightElement>
              <Button
                fontSize={14}
                color={"blue.500"}
                fontWeight={600}
                cursor={"pointer"}
                _hover={{ color: "white" }}
                bg={"transparent"}
                onClick={handleSubmitComment}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
};

export default PostFooter;
